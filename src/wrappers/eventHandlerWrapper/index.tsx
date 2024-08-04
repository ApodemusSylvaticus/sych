import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useGlobeContext } from '@openglobus/openglobus-react';
import { usePopupStore } from '../../store/popup.ts';

export const EventHandlerWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { globe } = useGlobeContext();
  const { openPopup, closePopup, isOpen } = usePopupStore((state) => ({
    openPopup: state.openPopup,
    closePopup: state.closePopup,
    isOpen: state.isOpen,
  }));
  const isOpenRef = useRef<boolean>(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (globe) {
      globe.renderer.events.on(
        'lclick',
        (e) => {
          closePopup();
          const lonLat = globe.planet.getLonLatFromPixelTerrain(e);
          if (lonLat && globe.planet.terrain) {
            globe.planet.terrain.getHeightAsync(lonLat, (h) => {
              openPopup({ dXdY: { x: e.clientX, y: e.clientY }, coords: { lon: lonLat.lon, lat: lonLat.lat, alt: h } });
            });
          }
        },
        globe.planet,
      );

      globe.renderer.events.on('mousewheel', () => {
        if (isOpenRef.current) {
          closePopup();
        }
      });

      globe.renderer.events.on('lhold', () => {
        if (isOpenRef.current) {
          closePopup();
        }
      });

      globe.renderer.events.on('rclick', () => {
        if (isOpenRef.current) {
          closePopup();
        }
      });
    }
  }, [globe, openPopup, closePopup]);

  return <>{children}</>;
};
