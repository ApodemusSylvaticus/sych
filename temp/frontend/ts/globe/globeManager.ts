import { DeviceStateDispatch } from "ts/statePub/deviceStateDispatch";
import {
    Entity,
    Globe,
    Vector,
    GeoObject,
    LonLat,
    utils,
    math,
    Popup,
    control, EmptyTerrain
} from "@openglobus/og";
import { JonGuiDataGps } from "ts/proto/jon/jon_shared_data_gps";
import { JonGuiDataCompass } from "ts/proto/jon/jon_shared_data_compass";
import { JonGuiDataTarget } from "ts/proto/jon/jon_shared_data_lrf";
import { OsmLayer } from "./osmLayer";
import { SatLayer } from "./satLayer";
import { JonGuiDataGpsFixType} from "../proto/jon/jon_shared_data_types";
import { setRotateToGps } from "../cmd/cmdSender/cmdRotary";
import { ModelLoader } from "./loader";

const MODEL_NAMES = [
    "sych",
    "archdukepiginand",
    "borntosqueal",
    "oldham",
    "pigatozoid",
    "pigineer",
    "tupolev",
    "whooligans"
];

class GlobeManager {
    private myPopup: Popup;
    private gpsHandlerFirstRun: boolean = true;
    private readonly globe: Globe;
    private readonly osmLayer: OsmLayer;
    private readonly satLayer: SatLayer;
    private readonly dummyCamLayer: Vector;
    private readonly currentSessionLayer: Vector;
    private readonly deviceStateDispatch: DeviceStateDispatch;
    private readonly containerID: string;
    private dummyCamEntity: Entity | null = null;
    private unsubscribers: Array<() => void> = [];
    private lastMeasureId: number = -1;
    private lastSessionId: number = -1;
    private curGPSFixType: JonGuiDataGpsFixType | undefined;
    private curUseManualGPS: boolean | undefined;
    private modelLoader: ModelLoader;

    constructor(deviceStateDispatch: DeviceStateDispatch, containerID: string) {
        this.deviceStateDispatch = deviceStateDispatch;

        this.containerID = containerID;

        this.osmLayer = new OsmLayer();
        this.satLayer = new SatLayer();
        this.dummyCamLayer = new Vector("DummyCamLayer", {
            clampToGround: true,
            relativeToGround: true,
            iconSrc: "./res/camera_layer.png",
            pickingScale: 1,
            pickingEnabled: true,
            scaleByDistance: [100, 24000000, 10000000000]
        });

        this.currentSessionLayer = new Vector("TargetLayer", {
            iconSrc: "./res/current_minion_layer.png",
            pickingScale: 1,
            pickingEnabled: true,
            scaleByDistance: [100, 24000000, 10000000000]
        });

        this.globe = new Globe({
            target: this.containerID,
            name: "Earth",
            terrain: new EmptyTerrain(),
            layers: [this.osmLayer, this.satLayer, this.dummyCamLayer, this.currentSessionLayer],
            atmosphereEnabled: true
        });

        this.myPopup = new Popup({
            planet: this.globe.planet,
            offset: [0, 0],
            visibility: false
        });

        this.modelLoader = new ModelLoader(
            MODEL_NAMES.reduce((acc, name) => {
                acc[name] = name;
                return acc;
            }, {} as { [key: string]: string })
        );

        this.initGlobe();

        this.initModels()
            .then(() => this.initDummyCam())
            .then(() => this.subscribeToStateUpdates())
            .catch(console.error);
    }

    private initGlobe(): void {
        if (this.globe.planet.renderer) {
            this.globe.planet.renderer.events.on("lclick", this.onGlobeClick.bind(this));
        } else {
            console.error("Globe renderer not initialized");
        }

        this.globe.planet.addControl(new control.LayerSwitcher());
    }

    private async initModels(): Promise<void> {
        await this.modelLoader.init();
    }

    private async initDummyCam(): Promise<void> {
        const sychGeoObject = this.modelLoader.createGeoObject("sych");
        if (!sychGeoObject) {
            console.error("Sych model not loaded");
            return;
        }

        this.dummyCamEntity = new Entity({
            lonlat: new LonLat(15.815316209646182, 50.02360496183876, 0),
        });

        this.dummyCamEntity.setGeoObject(sychGeoObject);

        this.dummyCamLayer.add(this.dummyCamEntity);

        this.dummyCamLayer.events.on("mouseenter", this.onMouseEnter.bind(this));
        this.dummyCamLayer.events.on("mouseleave", this.onMouseLeave.bind(this));
        this.dummyCamLayer.events.on("lclick", this.onClick.bind(this));
    }

    private subscribeToStateUpdates(): void {
        this.unsubscribers.push(
            this.deviceStateDispatch.gps.subscribe(this.handleGpsUpdate.bind(this)),
            this.deviceStateDispatch.compass.subscribe(this.handleCompassUpdate.bind(this)),
            this.deviceStateDispatch.lrf.subscribe(this.handleLrfUpdate.bind(this))
        );
    }

    private handleGpsUpdate(gps: JonGuiDataGps | undefined): void {
        if (!this.dummyCamEntity || !gps) return;

        let newPosition: LonLat;
        if (gps.useManual) {
            newPosition = new LonLat(gps.manualLongitude, gps.manualLatitude, gps.manualAltitude);
        } else {
            newPosition = new LonLat(gps.longitude, gps.latitude, gps.altitude);
        }

        this.dummyCamEntity.setLonLat(newPosition);

        if (this.gpsHandlerFirstRun ||
            (this.curGPSFixType && this.curGPSFixType !== gps.fixType) ||
            (this.curUseManualGPS && this.curUseManualGPS !== gps.useManual)) {
            this.curGPSFixType = gps.fixType;
            this.curUseManualGPS = gps.useManual;

            let ell = this.globe.planet.ellipsoid;
            this.globe.planet.camera.flyDistance(ell.lonLatToCartesian(newPosition));
            this.gpsHandlerFirstRun = false;
        }
    }

    private handleCompassUpdate(compass: JonGuiDataCompass | undefined): void {
        if (!this.dummyCamEntity || !this.dummyCamEntity.geoObject || !compass) {
            return;
        }

        const azimuth = math.DEG2RAD(compass.azimuth);
        this.dummyCamEntity.geoObject.setYaw(azimuth);
    }

    private handleLrfUpdate(lrf: { target?: JonGuiDataTarget; measureId?: number } | undefined): void {
        if (lrf?.target && lrf.measureId && lrf.measureId !== this.lastMeasureId) {
            // Skip initial update
            if (this.lastMeasureId)
            {
                this.handleTargetUpdate(lrf.target);
            }
            this.lastMeasureId = lrf.measureId;
        }
    }

    private handleTargetUpdate(target: JonGuiDataTarget): void {
        const newPos = new LonLat(target.targetLongitude, target.targetLatitude, target.targetAltitude);
        const sessionId = target.sessionId;
        const id = target.targetId;

        if (this.lastSessionId !== sessionId) {
            this.updatePreviousSessionTargets();
            this.lastSessionId = sessionId;
        }

        const randomModel = this.getRandomTargetModel();
        if (!randomModel) {
            console.error("No target models available");
            return;
        }

        const targetEntity = new Entity({
            lonlat: newPos,
            properties: {
                id: id,
                sessionId: sessionId,
                name: "",
            }
        });

        targetEntity.setGeoObject(randomModel);

        this.currentSessionLayer.add(targetEntity);
        this.globe.planet.flyLonLat(newPos);
    }

    private updatePreviousSessionTargets(): void {
        this.currentSessionLayer.each((entity: Entity) => {
            this.currentSessionLayer.removeEntity(entity);
        });
    }

    private getRandomTargetModel(): GeoObject | null {
        const availableModels = MODEL_NAMES.filter(name => name !== 'sych');
        if (availableModels.length === 0) return null;

        const randomName = availableModels[Math.floor(Math.random() * availableModels.length)];
        return this.modelLoader.createGeoObject(randomName);
    }

    private onGlobeClick(e: any): void {
        let lonLat = this.globe.planet.getLonLatFromPixelTerrain(e);
        if (!lonLat || !this.globe.planet.terrain) return;

        this.globe.planet.terrain.getHeightAsync(lonLat, (h) => {
            const content = `lon = ${lonLat.lon.toFixed(5)}<br/>lat = ${lonLat.lat.toFixed(5)}<br/>height(msl) = ${Math.round(h)} m`;
            this.myPopup.setContent(content);
            console.log(`Globe clicked at: ${lonLat.lon}, ${lonLat.lat}, ${h}`);
            setRotateToGps(lonLat.lon, lonLat.lat, h);
        });

        let groundPos = this.globe.planet.getCartesianFromMouseTerrain();
        if (!groundPos) return;

        this.myPopup.setCartesian3v(groundPos);
        this.myPopup.setVisibility(true);

        // let target = JonGuiDataTarget.create({
        //     targetId: 0,
        //     sessionId: 0,
        //     targetLongitude: lonLat.lon,
        //     targetLatitude: lonLat.lat,
        //     targetAltitude: 0
        // });
        //
        // this.handleTargetUpdate(target);
    }

    private onMouseEnter(e: any): void {
    }

    private onMouseLeave(e: any): void {
    }

    private onClick(e: any): void {
    }

    public destroy(): void {
        this.unsubscribers.forEach(unsubscribe => unsubscribe());
        this.unsubscribers = [];
    }
}

export default GlobeManager;
