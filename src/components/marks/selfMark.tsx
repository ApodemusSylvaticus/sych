import React, { useEffect, useState } from 'react';
import { Entity, Billboard, Vector, Geometry } from '@openglobus/openglobus-react';
import { ICoord, useMarkerStore } from '../../store/markers.ts';
import { useGlobusStore } from '../../store/globus.ts';
import { useModalStore } from '../../store/modals.ts';
import { calculateIntermediatePoint } from '../../utils/direction.ts';

export const LineMarker = React.memo(() => {
  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const [endPoint, setEndPoint] = useState<ICoord>();
  const [rerenderKey, setRerenderKey] = useState(0);
  const activeLayer = useGlobusStore((state) => state.activeLayer);
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);

  const lookOnPosition = useGlobusStore((state) => state.lookOnPosition);

  useEffect(() => {
    const intermediatePoint = calculateIntermediatePoint(selfMarker.coords, lookOnPosition, 30);
    setEndPoint(intermediatePoint);
    setRerenderKey((prev) => prev + 1);
  }, [selfMarker, lookOnPosition]);

  useEffect(() => {
    setRerenderKey((prev) => prev + 1);
  }, [activeLayer]);

  return (
    <>
      <Vector
        name={'SelfMarker'}
        clampToGround={true}
        onTouchStart={(e) => console.log('ss, ', e)}
        onTouchMove={(e) => console.log('ss, ', e)}
        onTouchEnd={(e) => console.log('ss, ', e)}
        onDoubleTouch={(e) => console.log('ss, ', e)}
        onMouseMove={(e) => console.log('ss, ', e)}
        onTouchEnter={(e) => console.log('ss, ', e)}
        onTouchLeave={(e) => console.log('ss, ', e)}
        onLclick={() => {
          openMarkerInfoModal({
            coords: selfMarker.coords,
            timeStamp: -1,
            notes: selfMarker.notes,
            tags: [],
            target: { value: 'default_self', src: '' },
          });
        }}
      >
        <Entity
          name="Self Marker"
          geometry={{ type: 'POINT', coordinates: [selfMarker.coords.lon, selfMarker.coords.lat, selfMarker.coords.alt] }}
          lon={selfMarker.coords.lon}
          lat={selfMarker.coords.lat}
          alt={selfMarker.coords.alt}
          properties={{ color: '#CF6679' }}
        >
          <Billboard size={[30, 30]} src={'src/assets/point2.svg'} color={'#CF6679'} />
        </Entity>
      </Vector>
      <Vector name={'Direction'} key={rerenderKey}>
        {endPoint && (
          <Entity name="line" lon={selfMarker.coords.lon} lat={selfMarker.coords.lat} alt={selfMarker.coords.alt}>
            <Geometry
              lineColor={'rgba(59, 6, 6, 1)'}
              lineWidth={5}
              type={'LINESTRING'}
              coordinates={[
                [selfMarker.coords.lon, selfMarker.coords.lat, selfMarker.coords.alt],
                [endPoint.lon, endPoint.lat, endPoint.alt || 0],
              ]}
            />
          </Entity>
        )}
      </Vector>
    </>
  );
});
