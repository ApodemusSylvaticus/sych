import { useEffect } from 'react';
import { Globe, GlobeContextProvider } from '@openglobus/openglobus-react';
import './App.css';
import { MainContainer } from './components/containers/style.ts';
import { MenuManipulationButton } from './components/menu';
import { ThemeWrapper } from './wrappers/theme';
import { EventHandlerWrapper } from './wrappers/eventHandlerWrapper';
import { RClickPopup } from './components/popup/rClick';
import { AddTargetModal } from './components/modals/addTarget';
import { useTagsStore } from './store/tags.ts';
import { useSettingsStore } from './store/settings.ts';
import i18n from 'i18next';
import { LineMarker } from './components/marks/selfMark.tsx';
import { TargetMarks } from './components/marks/targetMarks.tsx';
import { MarkerInfoModal } from './components/modals/markerInfo';
import { useMarkerStore } from './store/markers.ts';
import { useBroadcast } from './hooks/useBroadcast.ts';
import { EmptyMarker } from './components/marks/emptyMarker.tsx';
import { WebSocketConnectionManager } from './mainApp/js/webSocketConnectionManager';
import { XYZ } from '@openglobus/og';
import { GeoImageComponent } from './components/globus/geoImage/input.tsx';

function App(): JSX.Element {
  const { language, getLanguageFromLocalStorage } = useSettingsStore((state) => ({
    language: state.language,
    getLanguageFromLocalStorage: state.getLanguageFromLocalStorage,
  }));
  const getTagsFromLocalStorage = useTagsStore((state) => state.getTagsFromLocalStorage);
  useBroadcast();

  const getMarkersFromDB = useMarkerStore((state) => state.getMarkersFromDB);

  useEffect(() => {
    const wscm = new WebSocketConnectionManager();
    wscm.startWebSocketWorker('wss://sych.app/ws/ws_cmd', 'cmd', 'deviceState');

    return () => {
      wscm.stopAllWebSocketWorkers();
    };
  }, []);
  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  useEffect(() => {
    getTagsFromLocalStorage();
    getLanguageFromLocalStorage();
    getMarkersFromDB();
  }, []);

  return (
    <ThemeWrapper>
      <MainContainer>
        <GlobeContextProvider>
          <EventHandlerWrapper>
            <Globe
              name="myGlobe"
              layers={[
                new XYZ('OpenStreetMap', {
                  isBaseLayer: true,

                  // url: 'https://sych.app/api/map/osm/tile/{z}/{x}/{y}.png',
                  url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                  visibility: true,
                  attribution: 'Data @ OpenStreetMap contributors, ODbL',
                  // urlRewrite: function (s: TileInfo, u: string) {
                  //   return `https://sych.app/api/map/osm/tile/${s.tileZoom}/${s.tileX}/${s.tileY}.png`;
                  // },
                }),
              ]}
            >
              <LineMarker />
              <TargetMarks />
              <EmptyMarker />
              <GeoImageComponent />
            </Globe>
          </EventHandlerWrapper>
          <MenuManipulationButton />
        </GlobeContextProvider>
        <RClickPopup />
        <MarkerInfoModal />
        <AddTargetModal />
      </MainContainer>
    </ThemeWrapper>
  );
}

export default App;
