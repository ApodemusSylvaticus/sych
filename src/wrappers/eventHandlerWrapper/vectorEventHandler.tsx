import React, { useCallback } from 'react';
import { Entity, GeoObject, Vector } from '@openglobus/openglobus-react';
import { LineMarker } from '../../components/marks/selfMark.tsx';
import { TargetMarks } from '../../components/marks/targetMarks.tsx';
import { EmptyMarker } from '../../components/marks/emptyMarker.tsx';
import { useModalStore } from '../../store/modals.ts';
import { TargetTypeEnum } from '../../interface/markers.ts';
import { assertNever } from '../../interface/baseComponentsInterface.ts';
import { useMarkerStore } from '../../store/markers.ts';

const args = {
  visibility: true,
  yaw: 15500,
  roll: 0,
  pitch: 0,
  scale: 0.2,
  tag: 'none',
  color: 'black',
  objSrc: './line.obj',
};

export const VectorEventHandlerWrapper: React.FC = React.memo(() => {
  const openMarkerInfoModal = useModalStore((state) => state.openMarkerInfoModal);
  const selfMarker = useMarkerStore((state) => state.selfMarker);

  const handleEvent = useCallback(
    (e) => {
      if (e.pickingObject) {
        const value = e.pickingObject.properties.type as TargetTypeEnum;
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
      <Vector name={'test2'} scaleByDistance={[100, 2000000, 1]}>
        <Entity name="Custom Entity2" lon={selfMarker.coords.lon} lat={selfMarker.coords.lat} alt={selfMarker.coords.alt}>
          <GeoObject {...args} />
        </Entity>
      </Vector>
      <Vector name={'VectorEventHandler'} onLclick={handleEvent} onTouchEnd={handleEvent}>
        <LineMarker />
        <TargetMarks />
        <EmptyMarker />
      </Vector>
    </>
  );
});
