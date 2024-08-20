import { signal, Signal } from '@lit-labs/preact-signals';
import { JonGUIState } from "../proto/jon/jon_shared_data";
import { JonGuiDataGps } from "../proto/jon/jon_shared_data_gps";
import { JonGuiDataCompass } from "../proto/jon/jon_shared_data_compass";
import { JonGuiDataRotary } from "../proto/jon/jon_shared_data_rotary";
import { JonGuiDataPower } from "../proto/jon/jon_shared_data_power";
import { JonGuiDataCameraDay } from "../proto/jon/jon_shared_data_camera_day";
import { JonGuiDataCameraHeat } from "../proto/jon/jon_shared_data_camera_heat";
import { JonGuiDataCompassCalibration } from "../proto/jon/jon_shared_data_compass_calibration";
import { JonGuiDataEnvironment } from "../proto/jon/jon_shared_data_environment";
import { JonGuiDataTime } from "../proto/jon/jon_shared_data_time";
import { JonGuiDataLrf } from "../proto/jon/jon_shared_data_lrf";
import { JonGuiDataSystem } from "../proto/jon/jon_shared_data_system";

export class DeviceStateDispatch {
  private static instance: DeviceStateDispatch | null = null;
  private readonly channel: BroadcastChannel;

  private readonly systemSignal: Signal<JonGuiDataSystem | undefined>;
  private readonly lrfSignal: Signal<JonGuiDataLrf | undefined>;
  private readonly timeSignal: Signal<JonGuiDataTime | undefined>;
  private readonly gpsSignal: Signal<JonGuiDataGps | undefined>;
  private readonly compassSignal: Signal<JonGuiDataCompass | undefined>;
  private readonly rotarySignal: Signal<JonGuiDataRotary | undefined>;
  private readonly powerSignal: Signal<JonGuiDataPower | undefined>;
  private readonly cameraDaySignal: Signal<JonGuiDataCameraDay | undefined>;
  private readonly cameraHeatSignal: Signal<JonGuiDataCameraHeat | undefined>;
  private readonly compassCalibrationSignal: Signal<JonGuiDataCompassCalibration | undefined>;
  private readonly environmentSignal: Signal<JonGuiDataEnvironment | undefined>;

  private constructor(channelName: string = 'deviceState') {
    this.channel = new BroadcastChannel(channelName);
    this.channel.onmessage = this.handleBroadcastMessage.bind(this);

    this.systemSignal = signal<JonGuiDataSystem | undefined>(undefined);
    this.lrfSignal = signal<JonGuiDataLrf | undefined>(undefined);
    this.timeSignal = signal<JonGuiDataTime | undefined>(undefined);
    this.gpsSignal = signal<JonGuiDataGps | undefined>(undefined);
    this.compassSignal = signal<JonGuiDataCompass | undefined>(undefined);
    this.rotarySignal = signal<JonGuiDataRotary | undefined>(undefined);
    this.powerSignal = signal<JonGuiDataPower | undefined>(undefined);
    this.cameraDaySignal = signal<JonGuiDataCameraDay | undefined>(undefined);
    this.cameraHeatSignal = signal<JonGuiDataCameraHeat | undefined>(undefined);
    this.compassCalibrationSignal = signal<JonGuiDataCompassCalibration | undefined>(undefined);
    this.environmentSignal = signal<JonGuiDataEnvironment | undefined>(undefined);
  }

  public static getInstance(channelName: string = 'deviceState'): DeviceStateDispatch {
    if (!DeviceStateDispatch.instance) {
      DeviceStateDispatch.instance = new DeviceStateDispatch(channelName);
    }
    return DeviceStateDispatch.instance;
  }

  private handleBroadcastMessage(event: MessageEvent): void {
    try {
      const binaryData: Uint8Array = new Uint8Array(event.data);
      const deserializedData: JonGUIState = JonGUIState.decode(binaryData);
      this.updateSignals(deserializedData);
    } catch (error: any) {
      console.error('Error deserializing JonGUIState:', error);
    }
  }

  private updateSignals(newState: JonGUIState): void {
    this.compareAndUpdateSignal('system', this.systemSignal, newState.system);
    this.compareAndUpdateSignal('lrf', this.lrfSignal, newState.lrf);
    this.compareAndUpdateSignal('time', this.timeSignal, newState.time);
    this.compareAndUpdateSignal('gps', this.gpsSignal, newState.gps);
    this.compareAndUpdateSignal('compass', this.compassSignal, newState.compass);
    this.compareAndUpdateSignal('rotary', this.rotarySignal, newState.rotary);
    this.compareAndUpdateSignal('power', this.powerSignal, newState.power);
    this.compareAndUpdateSignal('cameraDay', this.cameraDaySignal, newState.cameraDay);
    this.compareAndUpdateSignal('cameraHeat', this.cameraHeatSignal, newState.cameraHeat);
    this.compareAndUpdateSignal('compassCalibration', this.compassCalibrationSignal, newState.compassCalibration);
    this.compareAndUpdateSignal('environment', this.environmentSignal, newState.environment);
  }

  private compareAndUpdateSignal<T>(
    key: keyof JonGUIState,
    signal: Signal<T | undefined>,
    newValue: T | undefined
  ): void {
    if (JSON.stringify(signal.value) !== JSON.stringify(newValue)) {
      signal.value = newValue;
    }
  }

  // Getter methods remain the same
  get system(): Signal<JonGuiDataSystem | undefined> {
    return this.systemSignal;
  }

  get lrf(): Signal<JonGuiDataLrf | undefined> {
    return this.lrfSignal;
  }

  get time(): Signal<JonGuiDataTime | undefined> {
    return this.timeSignal;
  }

  get gps(): Signal<JonGuiDataGps | undefined> {
    return this.gpsSignal;
  }

  get compass(): Signal<JonGuiDataCompass | undefined> {
    return this.compassSignal;
  }

  get rotary(): Signal<JonGuiDataRotary | undefined> {
    return this.rotarySignal;
  }

  get power(): Signal<JonGuiDataPower | undefined> {
    return this.powerSignal;
  }

  get cameraDay(): Signal<JonGuiDataCameraDay | undefined> {
    return this.cameraDaySignal;
  }

  get cameraHeat(): Signal<JonGuiDataCameraHeat | undefined> {
    return this.cameraHeatSignal;
  }

  get compassCalibration(): Signal<JonGuiDataCompassCalibration | undefined> {
    return this.compassCalibrationSignal;
  }

  get environment(): Signal<JonGuiDataEnvironment | undefined> {
    return this.environmentSignal;
  }
}