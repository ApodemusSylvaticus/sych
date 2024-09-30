import React from 'react';
import { useMarkerStore } from '../../store/markers.ts';
import { Billboard, Entity } from '@openglobus/openglobus-react';
import { TargetTypeEnum } from '../../interface/markers.ts';

export const EmptyMarker: React.FC = React.memo(() => {
  const emptyMarkers = useMarkerStore((state) => state.emptyMarkers);

  return (
    <>
      {emptyMarkers.map((el) => (
        <Entity
          key={el.uniqKey}
          name={el.uniqKey}
          lon={el.coords.lon}
          lat={el.coords.lat}
          alt={0}
          properties={{ uniqKey: el.uniqKey, type: TargetTypeEnum.empty }}
        >
          <Billboard size={[30, 30]} src={'./point.svg'} color={'rgb(74,74,74)'} />
        </Entity>
      ))}
    </>
  );
});
