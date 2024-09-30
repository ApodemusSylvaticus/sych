import React, { useEffect, useMemo, useRef } from 'react';
import { Billboard, Entity, useGlobeContext } from '@openglobus/openglobus-react';
import { useMarkerStore } from '../../store/markers.ts';
import { useGlobusStore } from '../../store/globus.ts';
import { LonLat } from '@openglobus/og';
import { TargetTypeEnum } from '../../interface/markers.ts';

export const SelfMarker = React.memo(() => {
  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const activeLayer = useGlobusStore((state) => state.activeLayer);

  const { globe } = useGlobeContext();

  const isOneTimeChanged = useRef(false);

  useEffect(() => {
    if (globe && selfMarker) {
      if ((selfMarker.coords.lon !== 0 || selfMarker.coords.lat !== 0) && !isOneTimeChanged.current) {
        isOneTimeChanged.current = true;
        globe.planet.camera.flyLonLat(new LonLat(selfMarker.coords.lon, selfMarker.coords.lat, 500000));
      }
    }
  }, [globe, selfMarker]);

  const selfMarkKey = useMemo(() => `self_mark_${selfMarker.coords.lat}_${selfMarker.coords.lon}_${activeLayer}`, [selfMarker, activeLayer]);

  return (
    <Entity
      key={selfMarkKey}
      geometry={{ type: 'POINT', coordinates: [selfMarker.coords.lon, selfMarker.coords.lat, selfMarker.coords.alt] }}
      lon={selfMarker.coords.lon}
      lat={selfMarker.coords.lat}
      alt={selfMarker.coords.alt}
      properties={{ color: '#9d2626', type: TargetTypeEnum.self }}
    >
      <Billboard key={selfMarkKey} size={[30, 30]} src={'./point.svg'} color={'#9d2626'} />
    </Entity>
  );
});
