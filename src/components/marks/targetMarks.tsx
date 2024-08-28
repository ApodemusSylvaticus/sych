import React, { useEffect, useState } from 'react';
import { useMarkerStore } from '../../store/markers.ts';
import { Billboard, Entity, Vector } from '@openglobus/openglobus-react';
import { useModalStore } from '../../store/modals.ts';

export const TargetMarks: React.FC = React.memo(() => {
  const filteredMarkers = useMarkerStore((state) => state.filteredMarkers);
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);
  // TODO REMOVE KEY (set it to interface)
  const [key, setKey] = useState(1);

  useEffect(() => {
    setKey((prev) => (prev += 1));
  }, [filteredMarkers]);

  return (
    <>
      {filteredMarkers.map((el) => (
        <Vector
          clampToGround={true}
          onLclick={() => openMarkerInfoModal(el)}
          onTouchEnd={() => openMarkerInfoModal(el)}
          name={`${el.timeStamp}_${el.coords.lon}_${el.coords.lat}`}
          key={`${key}_${el.timeStamp}_${el.coords.lon}_${el.coords.lat}`}
        >
          <Entity name={`${el.target.value}-el.timeStamp`} lon={el.coords.lon} lat={el.coords.lat} alt={0} properties={{ color: '#000002' }}>
            <Billboard size={[30, 30]} src={'./point.svg'} color={'#000002'} />
          </Entity>
        </Vector>
      ))}
    </>
  );
});
