import { useComputed } from '@preact/signals-react';
import { DeviceState, useDeviceStore } from '../store';

type NonNullableDeviceState = {
  [K in keyof DeviceState]-?: NonNullable<DeviceState[K]>;
};

export const useStrictDeviceData = () => {
  const store = useDeviceStore();

  const isDataReady = useComputed(() => {
    return (
      store.system !== undefined &&
      store.meteoInternal !== undefined &&
      store.meteoExternal !== undefined &&
      store.lrf !== undefined &&
      store.time !== undefined &&
      store.gps !== undefined &&
      store.compass !== undefined &&
      store.rotary !== undefined &&
      store.cameraDay !== undefined &&
      store.cameraHeat !== undefined &&
      store.compassCalibration !== undefined &&
      store.environment !== undefined
    );
  });

  if (isDataReady.value) {
    return {
      isDataReady: true as const,
      ...(store as NonNullableDeviceState),
    };
  } else {
    return {
      isDataReady: false as const,
      ...store,
    };
  }
};
