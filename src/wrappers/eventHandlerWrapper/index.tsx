import React, { PropsWithChildren, useEffect } from 'react';
import { useGlobeContext } from '@openglobus/openglobus-react';
import { usePopupStore } from '../../store/popup.ts';

export const EventHandlerWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { globe } = useGlobeContext();
  const { openPopup, closePopup } = usePopupStore((state) => ({ openPopup: state.openPopup, closePopup: state.closePopup }));

  useEffect(() => {
    if (globe) {
      globe.renderer.events.on(
        'lclick',
        (e) => {
          closePopup();
          const lonLat = globe.planet.getLonLatFromPixelTerrain(e);
          if (lonLat && globe.planet.terrain) {
            globe.planet.terrain.getHeightAsync(lonLat, (h) => {
              console.log({ dXdY: { x: e.clientX, y: e.clientY }, coords: { lon: lonLat.lon, lat: lonLat.lat, alt: h } });
              openPopup({ dXdY: { x: e.clientX, y: e.clientY }, coords: { lon: lonLat.lon, lat: lonLat.lat, alt: h } });
            });
          }
        },
        globe.planet,
      );
    }
  }, [globe, openPopup, closePopup]);

  return <>{children}</>;
};
