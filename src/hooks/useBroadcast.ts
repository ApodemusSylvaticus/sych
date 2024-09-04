import { useEffect, useRef } from 'react';
import { JonGUIState } from '../proto/jon/jon_shared_data.ts';
import { JonGuiDataGps } from '../proto/jon/jon_shared_data_gps.ts';
import { JonGuiDataLrf } from '../proto/jon/jon_shared_data_lrf.ts';
import { useMarkerStore } from '../store/markers.ts';
import { useGlobusStore } from '../store/globus.ts';
import { useDebounce } from 'use-debounce';

export const useBroadcast = () => {
  const gps = useRef<Pick<JonGuiDataGps, 'altitude' | 'longitude' | 'latitude'>>({ altitude: 0, latitude: 0, longitude: 0 });
  const emptyTarget = useRef<Pick<JonGuiDataLrf, 'measureId' | 'target'>>({ measureId: 0, target: undefined });
  const setAzimuth = useGlobusStore((state) => state.setAzimuth);
  const { setEmptyMarker, setSelfCoord } = useMarkerStore((state) => ({ setEmptyMarker: state.setEmptyMarker, setSelfCoord: state.setSelfCoord }));
  const [debouncedSetAzimuth] = useDebounce(setAzimuth, 500);

  useEffect(() => {
    let localAzimuth = 0;
    setInterval(() => {
      setAzimuth(localAzimuth);
      localAzimuth += 10;
    }, 500);
  }, []);

  useEffect(() => {
    const handleBroadcastMessage = (event: MessageEvent) => {
      try {
        const binaryData: Uint8Array = new Uint8Array(event.data);
        const deserializedData: JonGUIState = JonGUIState.decode(binaryData);
        if (deserializedData.gps) {
          console.log('deserializedData.gps', deserializedData.gps);

          if (
            gps.current.latitude !== deserializedData.gps.latitude &&
            gps.current.longitude !== deserializedData.gps.longitude &&
            gps.current.latitude !== deserializedData.gps.latitude
          ) {
            gps.current = {
              altitude: deserializedData.gps.altitude,
              latitude: deserializedData.gps.latitude,
              longitude: deserializedData.gps.longitude,
            };
            setSelfCoord({ alt: deserializedData.gps.altitude, lon: deserializedData.gps.longitude, lat: deserializedData.gps.latitude });
          }
        }

        if (deserializedData.compass) {
          console.log('deserializedData.compass', deserializedData.compass);
          debouncedSetAzimuth(deserializedData.compass.azimuth);
        }

        if (deserializedData.lrf) {
          console.log('deserializedData.lrf', deserializedData.lrf);

          if (emptyTarget.current.measureId !== deserializedData.lrf.measureId) {
            emptyTarget.current.measureId = deserializedData.lrf.measureId;
            emptyTarget.current.target = deserializedData.lrf.target;
            if (deserializedData.lrf.target) {
              setEmptyMarker({
                timeStamp: deserializedData.lrf.target.timestamp,
                coord: {
                  lon: deserializedData.lrf.target.targetLongitude,
                  lat: deserializedData.lrf.target.targetLatitude,
                  alt: deserializedData.lrf.target.targetAltitude,
                },
              });
            }
          }
        }
      } catch (error: any) {
        console.error('Error deserializing JonGUIState:', error);
      }
    };

    const channel = new BroadcastChannel('deviceState');

    channel.onmessage = handleBroadcastMessage;

    console.log('open channel', channel);

    return () => {
      console.log('close channel');

      channel.close();
    };
  }, [debouncedSetAzimuth, setEmptyMarker, setSelfCoord]);
};
