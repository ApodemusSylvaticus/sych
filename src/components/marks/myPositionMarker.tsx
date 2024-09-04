import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Billboard, Entity, Geometry, useGlobeContext, Vector } from '@openglobus/openglobus-react';
import { useMarkerStore } from '../../store/markers.ts';
import { useGlobusStore } from '../../store/globus.ts';
import { useModalStore } from '../../store/modals.ts';
import { LonLat } from '@openglobus/og';
import { calculateEndPointByAzimuth } from '../../utils/direction.ts';

export const MyPositionMarker = React.memo(() => {
  const { globe } = useGlobeContext();
  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const [end, setEnd] = useState<LonLat>();
  const activeLayer = useGlobusStore((state) => state.activeLayer);
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);
  const azimuth = useGlobusStore((state) => state.azimuth);
  const isOneTimeChanged = useRef(false);

  const calculateEnd = useCallback(() => {
    const intermediatePoint = calculateEndPointByAzimuth(new LonLat(selfMarker.coords.lon, selfMarker.coords.lat), azimuth, 30000);
    setEnd(intermediatePoint);
  }, [selfMarker, azimuth]);

  useEffect(() => {
    calculateEnd();
  }, [calculateEnd]);

  const handleMarkerClick = useCallback(() => {
    openMarkerInfoModal({
      files: [],
      uniqKey: 'selfMarker',
      coords: selfMarker.coords,
      timeStamp: -1,
      notes: selfMarker.notes,
      tags: [],
      target: { value: 'default_self', src: '', type: 'self' },
    });
  }, [openMarkerInfoModal, selfMarker]);

  useEffect(() => {
    if (globe && selfMarker) {
      if ((selfMarker.coords.lon !== 0 || selfMarker.coords.lat !== 0) && isOneTimeChanged.current === false) {
        isOneTimeChanged.current = true;
        globe.planet.camera.flyLonLat(new LonLat(selfMarker.coords.lon, selfMarker.coords.lat, 500000));
      }
    }
  }, [globe, selfMarker]);

  const vectorKey = useMemo(() => `Line_self_mark_${activeLayer}_${azimuth}`, [activeLayer, azimuth]);
  const selfMarkKey = useMemo(() => `self_mark_${selfMarker.coords.lat}_${selfMarker.coords.lon}_${activeLayer}`, [selfMarker, activeLayer]);

  return (
    <>
      <Vector key={selfMarkKey} name={'SelfMarker'} clampToGround={true} onLclick={handleMarkerClick} onTouchEnd={handleMarkerClick}>
        <Entity
          name="Self Marker"
          geometry={{ type: 'POINT', coordinates: [selfMarker.coords.lon, selfMarker.coords.lat, selfMarker.coords.alt] }}
          lon={selfMarker.coords.lon}
          lat={selfMarker.coords.lat}
          alt={selfMarker.coords.alt}
          properties={{ color: '#9d2626' }}
        >
          <Billboard size={[30, 30]} src={'./point.svg'} color={'#9d2626'} />
        </Entity>
      </Vector>

      {end && (
        <Vector key={vectorKey} name={`Line_self_mark`}>
          <Entity name={`Line_self_mark_entity`} lon={selfMarker.coords.lon} lat={selfMarker.coords.lat} alt={0}>
            <Geometry
              lineColor={'rgba(59, 6, 6, 1)'}
              lineWidth={5}
              type={'LINESTRING'}
              coordinates={[
                [selfMarker.coords.lon, selfMarker.coords.lat, 0],
                [end.lon, end.lat, 0],
              ]}
            />
          </Entity>
        </Vector>
      )}
    </>
  );
});
