import React, { useCallback } from 'react';
import { Vector } from '@openglobus/openglobus-react';
import { SelfMarker } from '../../components/marks/selfMarker.tsx';
import { TargetMarkers } from '../../components/marks/targetMarkers.tsx';
import { EmptyMarker } from '../../components/marks/emptyMarker.tsx';
import { useModalStore } from '../../store/modals.ts';
import { TargetTypeEnum } from '../../interface/markers.ts';
import { assertNever } from '../../interface/baseComponentsInterface.ts';
import { DirectionVector } from '../../components/directionVector';

export const VectorEventHandlerWrapper: React.FC = React.memo(() => {
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);

  const handleEvent = useCallback(
    (e: { pickingObject: { properties: { type: TargetTypeEnum; uniqKey: string } } }) => {
      if (e.pickingObject) {
        const value = e.pickingObject.properties.type;
        switch (value) {
          case TargetTypeEnum.self:
            openMarkerInfoModal({ type: TargetTypeEnum.self, uniqKey: '' });
            return;
          case TargetTypeEnum.target:
            openMarkerInfoModal({ type: TargetTypeEnum.target, uniqKey: e.pickingObject.properties.uniqKey });
            return;
          case TargetTypeEnum.empty:
            openMarkerInfoModal({ type: TargetTypeEnum.empty, uniqKey: e.pickingObject.properties.uniqKey });
            return;
          default:
            assertNever(value);
            return;
        }
      }
    },
    [openMarkerInfoModal],
  );

  return (
    <>
      <Vector name={'VectorEventHandler'} onLclick={handleEvent} onTouchEnd={handleEvent}>
        <SelfMarker />
        <TargetMarkers />
        <EmptyMarker />
      </Vector>
      <DirectionVector />
    </>
  );
});
