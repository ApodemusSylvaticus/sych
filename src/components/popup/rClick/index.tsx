import React, { useEffect, useRef, useState } from 'react';
import { ButtonContainer, Container, Divider } from './style.ts';
import { usePopupStore } from '../../../store/popup.ts';
export const RClickPopup: React.FC = () => {
  const { isOpen, dXdY, coords } = usePopupStore((state) => ({
    isOpen: state.isOpen,
    coords: state.coords,
    dXdY: state.dXdY,
  }));

  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [containerRef.current]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newX = dXdY.x;
    let newY = dXdY.y;

    if (dXdY.x + size.width > screenWidth) {
      newX = screenWidth - size.width;
    }

    if (dXdY.y + size.height > screenHeight) {
      newY = screenHeight - size.height;
    }

    setPosition({ x: newX, y: newY });
  }, [dXdY, size]);

  return (
    <Container ref={containerRef} x={position.x} y={position.y} isVisible={isOpen}>
      <span>lat: {coords.lat}</span>
      <span>lon: {coords.lon}</span>
      <span>alt: {coords.alt}</span>
      <Divider />
      <ButtonContainer>
        <button>Aim here</button>
        <button>Add target</button>
      </ButtonContainer>
    </Container>
  );
};
