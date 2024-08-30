import React, { useEffect } from 'react';
import { GeoImage } from '@openglobus/openglobus-react';
import { useGeoImgsStore } from '../../../store/geoImgs.ts';

export const GeoImageComponent: React.FC = React.memo(() => {
  const { geoImgs, getGeoImgsFromIndexedDB } = useGeoImgsStore((state) => ({
    geoImgs: state.geoImgs,
    getGeoImgsFromIndexedDB: state.getGeoImgsFromIndexedDB,
  }));

  useEffect(() => {
    getGeoImgsFromIndexedDB();
  }, [getGeoImgsFromIndexedDB]);
  return (
    <>
      {geoImgs
        .filter((el) => el.isShown)
        .map((el) => (
          <GeoImage
            name={el.uniqKey}
            key={el.uniqKey}
            src={el.src}
            corners={[
              [el.leftTopCorner.lon, el.leftTopCorner.lat],
              [el.rightTopCorner.lon, el.rightTopCorner.lat],
              [el.rightBottomCorner.lon, el.rightBottomCorner.lat],
              [el.leftBottomCorner.lon, el.leftBottomCorner.lat],
            ]}
          />
        ))}
    </>
  );
});
