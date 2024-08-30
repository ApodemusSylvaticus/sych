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
          onLclick={() =>
            openMarkerInfoModal({
              target: { value: 'default_empty', src: '', type: 'empty' },
              coords: el.coord,
              timeStamp: el.timeStamp,
              tags: [],
              notes: '',
              files: [],
              uniqKey: '',
            })
          }
          onTouchEnd={() =>
            openMarkerInfoModal({
              target: { value: 'default_empty', src: '', type: 'empty' },
              coords: el.coord,
              timeStamp: el.timeStamp,
              tags: [],
              notes: '',
              files: [],
              uniqKey: '',
            })
          }
          name={`${el.timeStamp}_${el.coord.lon}_${el.coord.lat}`}
          key={`${el.timeStamp}_${el.coord.lon}_${el.coord.lat}`}
        >
          <Entity
            key={`${el.timeStamp}_${el.coord.lon}_${el.coord.lat}`}
            name={`${el.timeStamp}-el.timeStamp`}
            lon={el.coord.lon}
            lat={el.coord.lat}
            alt={0}
            properties={{ color: 'rgb(74,74,74)' }}
          >
            <Billboard size={[30, 30]} src={'./point.svg'} color={'rgb(74,74,74)'} />
          </Entity>
        </Vector>
      ))}
    </>
  );
});
