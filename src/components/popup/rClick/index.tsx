import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonContainer, CloseButton, Divider, PaddingContainer, Wrapper } from './style.ts';
import { usePopupStore } from '../../../store/popup.ts';
import { useModalStore } from '../../../store/modals.ts';
import { Button } from '../../button/style.ts';
import { useTranslation } from 'react-i18next';
import { setRotateToGps } from '../../../mainApp/ts/cmd/cmdSender/cmdRotary.ts';

export const RClickPopup: React.FC = React.memo(() => {
  const { isOpen, dXdY, coords, closePopup } = usePopupStore((state) => ({
    isOpen: state.isOpen,
    coords: state.coords,
    dXdY: state.dXdY,
    closePopup: state.closePopup,
  }));
  const openNewTargetModal = useModalStore((state) => state.openNewTargetModal);
  const { t } = useTranslation();
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
          x: dXdY.x + 2,
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
          x: size.width - window.innerWidth + dXdY.x + 2,
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
        x: size.width / 2 + 2,
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
          x: dXdY.x + 2,
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
          x: size.width - window.innerWidth + dXdY.x + 2,
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
        x: size.width / 2 + 2,
        y: -9,
        isTopView: true,
      });
    }
  }, [dXdY, size]);

  const aimHereAction = useCallback(() => {
    setRotateToGps(coords.lon, coords.lat, 0);
    closePopup();
  }, [coords, closePopup]);

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
        <CloseButton onClick={closePopup} />
        <span>
          {t('default_lat')}: {coords.lat}
        </span>
        <span>
          {t('default_lon')}: {coords.lon}
        </span>
        <span>
          {t('default_alt')}: {coords.alt}
        </span>
      </PaddingContainer>
      <Divider />

      <PaddingContainer>
        <ButtonContainer>
          <Button onClick={aimHereAction}>{t('default_aim_here')}</Button>
          <Button onClick={() => openNewTargetModal(coords)}>{t('default_add_target')}</Button>
        </ButtonContainer>
      </PaddingContainer>
    </Wrapper>
  );
});
