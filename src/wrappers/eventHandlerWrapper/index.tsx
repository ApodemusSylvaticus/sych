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
  const touchRefStart = useRef(null);

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
          console.log('lclick', e);

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

      globe.renderer.events.on('touchstart', (e) => {
        console.log('touchstart', e);

        // const eventSequence = ['mousedown', 'mouseup', 'click'];
        //
        // eventSequence.forEach((eventType) => {
        //   const mouseEvent = new MouseEvent(eventType, {
        //     view: window,
        //     bubbles: true,
        //     cancelable: true,
        //     clientX: e.clientX,
        //     clientY: e.clientY,
        //     button: 0,
        //     buttons: eventType === 'mousedown' ? 1 : 0,
        //   });
        //
        //   // Отправляем событие на document
        //   document.getElementById('canvas__globus2__')!.dispatchEvent(mouseEvent);
        // });
        touchRefStart.current = { x: e.clientX, y: e.clientY };
      });

      globe.renderer.events.on('touchend', (e) => {
        console.log('touchend', e);
        const prevDxDy = touchRefStart.current;
        const dXdY = { x: e.clientX, y: e.clientY };
        if (Math.abs(prevDxDy.x - dXdY.x) <= 5 && Math.abs(prevDxDy.y - dXdY.y) <= 5) {
          const lonLat = globe.planet.getLonLatFromPixelTerrain(e);
          setTimeout(() => {
            if (lonLat) {
              openPopup({ dXdY, coords: { lon: lonLat.lon, lat: lonLat.lat, alt: lonLat.height } });
            }
          }, 0);
        }
      });

      globe.renderer.events.on('touchmove', (e) => {
        console.log('touchmove', e);
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
