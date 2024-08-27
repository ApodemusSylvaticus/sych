import React from 'react';
import { useMarkerStore } from '../../store/markers.ts';
import { Billboard, Entity, Vector } from '@openglobus/openglobus-react';
import { useModalStore } from '../../store/modals.ts';

export const EmptyMarker: React.FC = React.memo(() => {
  const emptyMarkers = useMarkerStore((state) => state.emptyMarkers);
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);

  return (
    <>
      {emptyMarkers.map((el) => (
        <Vector
          clampToGround={true}
          onLclick={() => openMarkerInfoModal(el)}
          name={`${el.timeStamp}_${el.coord.lon}_${el.coord.lat}`}
          key={`${el.timeStamp}_${el.coord.lon}_${el.coord.lat}`}
        >
          <Entity name={`${el.timeStamp}-el.timeStamp`} lon={el.coord.lon} lat={el.coord.lat} alt={0} properties={{ color: '#000002' }}>
            <Billboard size={[30, 30]} src={'./point.svg'} color={'#000002'} />
          </Entity>
        </Vector>
      ))}
    </>
  );
});
