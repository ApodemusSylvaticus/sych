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
          onLclick={() => openMarkerInfoModal(el)}
          name={`${el.timeStamp}_${el.coords.lon}_${el.coords.lat}`}
          key={`${el.timeStamp}_${el.coords.lon}_${el.coords.lat}`}
        >
          <Entity name={`${el.target.value}-el.timeStamp`} lon={el.coords.lon} lat={el.coords.lat} alt={0} properties={{ color: '#000002' }}>
            <Billboard size={[30, 30]} src={'src/assets/point2.svg'} color={'#000002'} />
          </Entity>
        </Vector>
      ))}
    </>
  );
});
