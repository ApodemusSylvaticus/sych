import { Object3d, GeoObject } from "@openglobus/og";

type ModelMap = { [key: string]: string };

export class ModelLoader {
    private readonly modelMap: ModelMap;
    private loadedObjects: { [key: string]: Object3d } = {};

    constructor(modelMap: ModelMap) {
        this.modelMap = modelMap;
    }

    async init(): Promise<void> {
        const loadPromises = Object.entries(this.modelMap).map(async ([name, baseName]) => {
            try {
                const objPath = `./res/models/${baseName}.obj`;
                const objArray = await Object3d.loadObj(objPath);

                if (objArray.length > 0) {
                    this.loadedObjects[name] = objArray[0];
                } else {
                    console.warn(`No objects loaded for ${name}`);
                }
            } catch (error) {
                console.error(`Error loading model ${name}:`, error);
            }
        });

        await Promise.all(loadPromises);
    }

    createGeoObject(name: string): GeoObject | null {
        const obj = this.loadedObjects[name];
        if (!obj) {
            console.warn(`No loaded object found for ${name}`);
            return null;
        }

        const baseName = this.modelMap[name];
        const texturePath = `./res/models/${baseName}.png`;

        const geoObject = new GeoObject({
            object3d: obj,
            scale: 0.00000000005,
            tag: name,
        });

        geoObject.setTextureSrc(texturePath);

        return geoObject;
    }
}