import React, { useEffect, useMemo } from 'react';
import { useGlobusStore } from '../../../store/globus';
import { XYZ } from '@openglobus/openglobus-react';
import { utils } from '@openglobus/og';

function toQuadKey(x: number, y: number, z: number): string {
  let index = '';
  for (let i = z; i > 0; i--) {
    let b = 0;
    const mask = 1 << (i - 1);
    if ((x & mask) !== 0) b++;
    if ((y & mask) !== 0) b += 2;
    index += b.toString();
  }
  return index;
}

interface TileInfo {
  tileX: number;
  tileY: number;
  tileZoom: number;
}

const satArgs = {
  name: 'sat',
  opacity: 1,
  url: 'https://ecn.{s}.tiles.virtualearth.net/tiles/a{quad}.jpeg?n=z&g=7146',
  subdomains: ['t0', 't1', 't2', 't3'],
  urlRewrite: function (s: TileInfo, u: string) {
    return utils.stringTemplate(u, {
      s: ['t0', 't1', 't2', 't3'][Math.round(Math.random() * 3)],
      quad: toQuadKey(s.tileX, s.tileY, s.tileZoom),
    });
  },
};

// const osmArgs = {
//   name: 'osm',
//   opacity: 1,
//   isBaseLayer: true,
//   visibility: false,
//   maxNativeZoom: 19,
//   defaultTextures: [{ color: '#AAD3DF' }, { color: '#F2EFE9' }],
//   isSRGB: false,
//   shininess: 18,
//   specular: [0.00063, 0.00055, 0.00032],
//   ambient: [0.2, 0.2, 0.3],
//   diffuse: [0.9, 0.9, 0.7],
//   url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//   urlRewrite: function (s: TileInfo, u: string) {
//     return `https://sych.app/api/map/osm/tile/${s.tileX}/${s.tileY}/${s.tileZoom}.png`;
//   },
// };

const isTest = true;

const osmArgs = {
  name: 'osm',
  opacity: 1,
  url: `${window.location.origin}/api/map/osm/tile/{z}/{x}/{y}.png`,
  isBaseLayer: isTest ? false : true,
  urlRewrite: function (s: TileInfo, u: string) {
    if (isTest) {
      utils.stringTemplate(u, {
        x: s.tileX,
        y: s.tileY,
        z: s.tileZoom,
      });
    }
    return `${window.location.origin}/api/map/osm/tile/${s.tileZoom}/${s.tileX}/${s.tileY}.png`;
  },
};

export const Layer: React.FC = React.memo(() => {
  const activeLayer = useGlobusStore((state) => state.activeLayer);
  const [key, setKey] = React.useState(1);

  const param = useMemo(() => (activeLayer === 'OSM' ? osmArgs : satArgs), [activeLayer]);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [activeLayer]);

  return <XYZ key={key} {...param} />;
});
