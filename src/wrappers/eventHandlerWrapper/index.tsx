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
      console.log('tyt');
      globe.renderer.events.on(
        'lclick',
        (e) => {
          closePopup();

          if (e.pickingObject && e.pickingObject.billboard) {
            return;
          }

          const dXdY = { x: e.clientX, y: e.clientY };
          const lonLat = globe.planet.getLonLatFromPixelTerrain(e);

          setTimeout(() => {
            if (lonLat) {
              openPopup({ dXdY, coords: { lon: lonLat.lon, lat: lonLat.lat, alt: lonLat.height } });
            }
          }, 0);

          // if (lonLat && globe.planet.terrain) {
          //   globe.planet.terrain.getHeightAsync(lonLat, (h) => {
          //     openPopup({ dXdY, coords: { lon: lonLat.lon, lat: lonLat.lat, alt: h } });
          //   });
          // }
        },
        globe.planet,
      );

      globe.renderer.events.on('mousewheel', () => {
        if (isOpenRef.current) {
          closePopup();
        }
      });

      // globe.renderer.events.on('touchstart', touchStart);

      globe.renderer.events.on('touchenter', (e) => {
        console.log('touchenter', e);
      });

      // globe.renderer.events.on('touchend', (e) => {
      //   console.log('e end', e);
      // });

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
