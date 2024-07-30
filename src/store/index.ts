import { create } from 'zustand';

import { JonGuiDataGps } from '../proto/jon/jon_shared_data_gps';
import { JonGuiDataCompass } from '../proto/jon/jon_shared_data_compass';
import { JonGuiDataRotary } from '../proto/jon/jon_shared_data_rotary';
import { JonGuiDataCameraDay } from '../proto/jon/jon_shared_data_camera_day';
import { JonGuiDataCameraHeat } from '../proto/jon/jon_shared_data_camera_heat';
import { JonGuiDataCompassCalibration } from '../proto/jon/jon_shared_data_compass_calibration';
import { JonGuiDataEnvironment } from '../proto/jon/jon_shared_data_environment';
import { JonGuiDataTime } from '../proto/jon/jon_shared_data_time';
// import { JonGuiDataMeteo } from '../proto/jon/jon_shared_data_meteo'
import { JonGuiDataLrf } from '../proto/jon/jon_shared_data_lrf';
import { JonGuiDataSystem } from '../proto/jon/jon_shared_data_system';

export interface DeviceState {
  system?: JonGuiDataSystem;
  meteoInternal?: any;
  meteoExternal?: any;
  lrf?: JonGuiDataLrf;
  time?: JonGuiDataTime;
  gps?: JonGuiDataGps;
  compass?: JonGuiDataCompass;
  rotary?: JonGuiDataRotary;
  cameraDay?: JonGuiDataCameraDay;
  cameraHeat?: JonGuiDataCameraHeat;
  compassCalibration?: JonGuiDataCompassCalibration;
  environment?: JonGuiDataEnvironment;
}

interface DeviceStateActions {
  updateState: (newState: Partial<DeviceState>) => void;
}

export const useDeviceStore = create<DeviceState & DeviceStateActions>((set) => ({
  system: undefined,
  meteoInternal: undefined,
  meteoExternal: undefined,
  lrf: undefined,
  time: undefined,
  gps: undefined,
  compass: undefined,
  rotary: undefined,
  cameraDay: undefined,
  cameraHeat: undefined,
  compassCalibration: undefined,
  environment: undefined,
  updateState: (newState) => set((state) => ({ ...state, ...newState })),
}));
