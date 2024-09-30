import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useGlobeContext } from '@openglobus/openglobus-react';
import { usePopupStore } from '../../store/popup.ts';

export const GlobeEventHandlerWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { globe } = useGlobeContext();
  const openPopup = usePopupStore((state) => state.openPopup);
  const closePopup = usePopupStore((state) => state.closePopup);
  const isOpen = usePopupStore((state) => state.isOpen);

  const isOpenRef = useRef<boolean>(false);
  const touchRefStart = useRef(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (globe) {
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

      globe.renderer.events.on('touchstart', (e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        touchRefStart.current = { x: e.clientX, y: e.clientY };
      });

      globe.renderer.events.on('touchend', (e) => {
        // console.log('touchend', e);
        const prevDxDy = touchRefStart.current;
        const dXdY = { x: e.clientX, y: e.clientY };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (Math.abs(prevDxDy.x - dXdY.x) <= 5 && Math.abs(prevDxDy.y - dXdY.y) <= 5) {
          closePopup();

          if (e.pickingObject && e.pickingObject.billboard) {
            return;
          }

          const lonLat = globe.planet.getLonLatFromPixelTerrain(e);

          setTimeout(() => {
            if (lonLat) {
              openPopup({ dXdY, coords: { lon: lonLat.lon, lat: lonLat.lat, alt: lonLat.height } });
            }
          }, 0);
        }
      });

      globe.renderer.events.on('touchmove', () => {
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
