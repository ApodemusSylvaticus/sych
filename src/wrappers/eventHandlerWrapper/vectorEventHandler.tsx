import React, { useCallback } from 'react';
import { Vector } from '@openglobus/openglobus-react';
import { LineMarker } from '../../components/marks/selfMark.tsx';
import { TargetMarks } from '../../components/marks/targetMarks.tsx';
import { EmptyMarker } from '../../components/marks/emptyMarker.tsx';
import { useMarkerStore } from '../../store/markers.ts';
import { useModalStore } from '../../store/modals.ts';

export const VectorEventHandlerWrapper: React.FC = React.memo(() => {
  const selfMarkerClick = useCallback(() => {
    openMarkerInfoModal({
      files: [],
      uniqKey: 'selfMarker',
      coords: selfMarker.coords,
      timeStamp: -1,
      notes: selfMarker.notes,
      tags: [],
      target: { value: 'default_self', src: '', type: 'self' },
    });
  }, [openMarkerInfoModal, selfMarker]);

  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);

  return (
    <Vector name={'VectorEventHandler'} onLclick={(e) => console.log(e)} onTouchEnd={(e) => console.log(e)}>
      <LineMarker />
      <TargetMarks />
      <EmptyMarker />
    </Vector>
  );
});
