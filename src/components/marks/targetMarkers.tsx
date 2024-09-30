import React from 'react';
import { useMarkerStore } from '../../store/markers.ts';
import { Billboard, Entity } from '@openglobus/openglobus-react';
import { TargetTypeEnum } from '../../interface/markers.ts';

export const TargetMarkers: React.FC = React.memo(() => {
  const filteredMarkers = useMarkerStore((state) => state.filteredMarkers);

  return (
    <>
      {filteredMarkers.map((el) => (
        <Entity
          key={el.uniqKey}
          name={el.uniqKey}
          lon={el.coords.lon}
          lat={el.coords.lat}
          alt={0}
          properties={{ uniqKey: el.uniqKey, type: TargetTypeEnum.target }}
        >
          <Billboard name={el.uniqKey} size={[30, 30]} src={'./point.svg'} color={'#000002'} />
        </Entity>
      ))}
    </>
  );
});
