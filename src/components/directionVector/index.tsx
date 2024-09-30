import React, { useEffect, useState } from 'react';
import { Entity, GeoObject, Vector } from '@openglobus/openglobus-react';
import { useMarkerStore } from '../../store/markers.ts';
import { useGlobusStore } from '../../store/globus.ts';

const args = {
  visibility: true,
  roll: 0,
  pitch: 0,
  scale: 0.2,
  tag: 'none',
  color: 'black',
  objSrc: './line.obj',
};

export const DirectionVector: React.FC = React.memo(() => {
  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const azimuth = useGlobusStore((state) => state.azimuth);
  const [realAzimuth, setRealAzimuth] = useState(0);

  useEffect(() => {
    setRealAzimuth(azimuth - 90);
  }, [azimuth]);
  return (
    <Vector name={'directionVector'} scaleByDistance={[100, 1400000, 1]}>
      <Entity name="directionVectorEntity" lon={selfMarker.coords.lon} lat={selfMarker.coords.lat} alt={selfMarker.coords.alt}>
        <GeoObject key={realAzimuth} {...args} yaw={realAzimuth} />
      </Entity>
    </Vector>
  );
});
