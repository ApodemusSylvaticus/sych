import React from 'react';
import { useMarkerStore } from '../../store/markers.ts';
import { Billboard, Entity, Vector } from '@openglobus/openglobus-react';
import { useModalStore } from '../../store/modals.ts';

export const TargetMarks: React.FC = React.memo(() => {
  const filteredMarkers = useMarkerStore((state) => state.filteredMarkers);
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);

  return (
    <>
      {filteredMarkers.map((el) => (
        <Vector
          clampToGround={true}
          onLclick={(e) => {
            console.log(e);
            openMarkerInfoModal(el);
          }}
          onTouchEnd={(e) => {
            console.log(e);
            openMarkerInfoModal(el);
          }}
          name={`${el.timeStamp}_${el.coords.lon}_${el.coords.lat}`}
          key={el.uniqKey}
        >
          <Entity
            key={el.uniqKey}
            name={`${el.target.value}-el.timeStamp`}
            lon={el.coords.lon}
            lat={el.coords.lat}
            alt={0}
            properties={{ color: '#000002', name: el.uniqKey, type: 'empty' }}
          >
            <Billboard name={el.uniqKey} size={[30, 30]} src={'./point.svg'} color={'#000002'} />
          </Entity>
        </Vector>
      ))}
    </>
  );
});
