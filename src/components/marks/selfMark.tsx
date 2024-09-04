import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Billboard, Entity, Geometry, useGlobeContext, Vector } from '@openglobus/openglobus-react';
import { useMarkerStore } from '../../store/markers.ts';
import { useGlobusStore } from '../../store/globus.ts';
import { useModalStore } from '../../store/modals.ts';
import { LonLat } from '@openglobus/og';
import { calculateEndPointByAzimuth } from '../../utils/direction.ts';

export const LineMarker = React.memo(() => {
  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const activeLayer = useGlobusStore((state) => state.activeLayer);
  const azimuth = useGlobusStore((state) => state.azimuth);

  const { globe } = useGlobeContext();

  const isOneTimeChanged = useRef(false);

  const [end, setEnd] = useState<LonLat>();

  const calculateEnd = useCallback(() => {
    const intermediatePoint = calculateEndPointByAzimuth(new LonLat(selfMarker.coords.lon, selfMarker.coords.lat), azimuth, 30000);
    setEnd(intermediatePoint);
  }, [selfMarker, azimuth, globe]);

  useEffect(() => {
    calculateEnd();
  }, [calculateEnd]);

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
      <Entity
        key={selfMarkKey}
        geometry={{ type: 'POINT', coordinates: [selfMarker.coords.lon, selfMarker.coords.lat, selfMarker.coords.alt] }}
        lon={selfMarker.coords.lon}
        lat={selfMarker.coords.lat}
        alt={selfMarker.coords.alt}
        properties={{ color: '#9d2626', type: 'Self' }}
      >
        <Billboard key={selfMarkKey} size={[30, 30]} src={'./point.svg'} color={'#9d2626'} />
      </Entity>

      {end && (
        <Entity key={vectorKey} lon={selfMarker.coords.lon} lat={selfMarker.coords.lat} alt={0}>
          <Geometry
            key={vectorKey}
            lineColor={'rgba(59, 6, 6, 1)'}
            lineWidth={5}
            type={'LINESTRING'}
            coordinates={[
              [selfMarker.coords.lon, selfMarker.coords.lat, 0],
              [end.lon, end.lat, 0],
            ]}
          />
        </Entity>
      )}
    </>
  );
});
