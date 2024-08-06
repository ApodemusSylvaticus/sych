import { useEffect, useState } from 'react';
import { Billboard, Entity, Globe, GlobeContextProvider, Vector, XYZ } from '@openglobus/openglobus-react';
import './App.css';
import { utils } from '@openglobus/og';
import { MainContainer } from './components/containers/style.ts';
import { MenuManipulationButton } from './components/menu';
import { ThemeWrapper } from './wrappers/theme';
import { useMarkerStore } from './store/markers.ts';
import { EventHandlerWrapper } from './wrappers/eventHandlerWrapper';
import { RClickPopup } from './components/popup/rClick';
import { AddTargetModal } from './components/modals/addTarget';
import { useTagsStore } from './store/tags.ts';

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

const args = {
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

function App(): JSX.Element {
  const [showSat, setShowSat] = useState(false);
  const { selfMarker, filtered, allMarkers } = useMarkerStore((state) => ({
    selfMarker: state.selfMarker,
    filtered: state.filteredMarkers,
    allMarkers: state.allMarkers,
  }));

  const getTagsFromLocalStorage = useTagsStore((state) => state.getTagsFromLocalStorage);

  const handleGlobeClick = (event: any) => {
    console.log(event);
  };

  useEffect(() => {
    getTagsFromLocalStorage();
  }, []);

  return (
    <ThemeWrapper>
      <MainContainer>
        <GlobeContextProvider>
          <EventHandlerWrapper>
            <Globe name="myGlobe" onLdown={handleGlobeClick} onMclick={handleGlobeClick} onMouseMove={handleGlobeClick}>
              {!showSat && <XYZ name="osm" opacity={1} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />}
              {showSat && <XYZ {...args} />}

              <Vector name="filtered-markers">
                {allMarkers.map((el, index) => (
                  <Entity
                    key={index}
                    name={`entity-${index}`}
                    lon={el.coords.lon}
                    lat={el.coords.lat}
                    alt={el.coords.alt}
                    properties={{ color: '#CF6679' }}
                  >
                    <Billboard size={[60, 60]} src={'src/assets/point2.svg'} color={'#CF6679'} />
                  </Entity>
                ))}
              </Vector>

              <Vector name={'Target'}>
                <Entity
                  name="Self Marker"
                  lon={selfMarker.coords.lon}
                  lat={selfMarker.coords.lat}
                  alt={selfMarker.coords.alt}
                  properties={{ color: '#000002' }}
                >
                  <Billboard size={[60, 60]} src={'src/assets/point2.svg'} color={'#000002'} />
                </Entity>
              </Vector>
            </Globe>
          </EventHandlerWrapper>
          <MenuManipulationButton />
        </GlobeContextProvider>

        <button
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            padding: '10px',
          }}
          onClick={() => setShowSat(!showSat)}
        >
          Toggle {showSat ? 'OSM' : 'Satellite'}
        </button>
        <RClickPopup />
        <AddTargetModal />
      </MainContainer>
    </ThemeWrapper>
  );
}

export default App;
