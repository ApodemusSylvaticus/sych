import React, { useEffect, useRef, useState } from 'react';
import { ButtonContainer, Container, Divider, PaddingContainer, Wrapper } from './style.ts';
import { usePopupStore } from '../../../store/popup.ts';
import { useModalStore } from '../../../store/modals.ts';
import { Button } from '../../button/style.ts';

export const RClickPopup: React.FC = React.memo(() => {
  const { isOpen, dXdY, coords } = usePopupStore((state) => ({
    isOpen: state.isOpen,
    coords: state.coords,
    dXdY: state.dXdY,
  }));
  const openNewTargetModal = useModalStore((state) => state.openNewTargetModal);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0, isTopView: false });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [containerRef.current]);

  useEffect(() => {
    if (dXdY.y - size.height > 5) {
      // облако сверху
      if (dXdY.x - size.width / 2 < 0) {
        // Не хватает места слева
        console.log('tyt', dXdY, size);
        setPosition({
          x: 0,
          y: dXdY.y - size.height - 5,
        });
        setPointerPosition({
          x: dXdY.x,
          y: size.height,
          isTopView: false,
        });

        return;
      }
      if (window.innerWidth - dXdY.x - size.width / 2 < 0) {
        // Не хватает места справа
        setPosition({
          x: window.innerWidth - size.width,
          y: dXdY.y - size.height - 5,
        });
        setPointerPosition({
          x: size.width - window.innerWidth + dXdY.x,
          y: size.height,
          isTopView: false,
        });

        return;
      }

      setPosition({
        x: dXdY.x - size.width / 2,
        y: dXdY.y - size.height - 5,
      });
      setPointerPosition({
        x: size.width / 2,
        y: size.height,
        isTopView: false,
      });
    } else {
      // облако снизу

      if (dXdY.x - size.width / 2 < 0) {
        // Не хватает места слева

        setPosition({
          x: 0,
          y: dXdY.y + 5,
        });
        setPointerPosition({
          x: dXdY.x,
          y: -9,
          isTopView: true,
        });
        return;
      }

      if (window.innerWidth - dXdY.x - size.width / 2 < 0) {
        // Не хватает места справа

        setPosition({
          x: window.innerWidth - size.width,
          y: dXdY.y + 5,
        });
        setPointerPosition({
          x: size.width - window.innerWidth + dXdY.x,
          y: -9,
          isTopView: true,
        });
        return;
      }

      setPosition({
        x: dXdY.x - size.width / 2,
        y: dXdY.y + 5,
      });
      setPointerPosition({
        x: size.width / 2,
        y: -9,
        isTopView: true,
      });
    }
  }, [dXdY, size]);

  return (
    <Wrapper
      maxW={size.width}
      isTopView={pointerPosition.isTopView}
      arrowX={pointerPosition.x}
      arrowY={pointerPosition.y}
      ref={containerRef}
      x={position.x}
      y={position.y}
      isVisible={isOpen}
    >
      <PaddingContainer>
        <span>Lat: {coords.lat}</span>
        <span>Lon: {coords.lon}</span>
        <span>Alt: {coords.alt}</span>
      </PaddingContainer>
      <Divider />

      <PaddingContainer>
        <ButtonContainer>
          <Button>Aim here</Button>
          <Button onClick={() => openNewTargetModal(coords)}>Add target</Button>
        </ButtonContainer>
      </PaddingContainer>
    </Wrapper>
  );
});
