import React from 'react';
import { useGlobusStore } from '../../../store/globus.ts';
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

const satArgs = {
  name: 'sat',
  opacity: 1,
  url: 'https://ecn.{s}.tiles.virtualearth.net/tiles/a{quad}.jpeg?n=z&g=7146',
  subdomains: ['t0', 't1', 't2', 't3'],
  urlRewrite: function (s: any, u: string) {
    return utils.stringTemplate(u, {
      s: ['t0', 't1', 't2', 't3'][Math.round(Math.random() * 3)],
      quad: toQuadKey(s.tileX, s.tileY, s.tileZoom),
    });
  },
};

export const Layer: React.FC = React.memo(() => {
  const activeLayer = useGlobusStore((state) => state.activeLayer);

  return (
    <>
      {activeLayer === 'OSM' && <XYZ name="osm" opacity={1} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />}
      {activeLayer === 'SAT' && <XYZ {...satArgs} />}
    </>
  );
});
