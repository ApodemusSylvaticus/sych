import { useEffect } from 'react';
import { Globe, GlobeContextProvider } from '@openglobus/openglobus-react';
import './App.css';
import { MainContainer } from './components/containers/style.ts';
import { MenuManipulationButton } from './components/menu';
import { ThemeWrapper } from './wrappers/theme';
import { GlobeEventHandlerWrapper } from './wrappers/eventHandlerWrapper/globeEventHandlerWrapper.tsx';
import { RClickPopup } from './components/popup/rClick';
import { AddTargetModal } from './components/modals/addTarget';
import { useTagsStore } from './store/tags.ts';
import { useSettingsStore } from './store/settings.ts';
import i18n from 'i18next';
import { MarkerInfoModal } from './components/modals/markerInfo';
import { useMarkerStore } from './store/markers.ts';
import { useBroadcast } from './hooks/useBroadcast.ts';
import { WebSocketConnectionManager } from './mainApp/js/webSocketConnectionManager';
import { GeoImageComponent } from './components/globus/geoImage/input.tsx';
import { CenterButton } from './components/centerButton';
import { Layer } from './components/globus/layer';
import { VectorEventHandlerWrapper } from './wrappers/eventHandlerWrapper/vectorEventHandler.tsx';

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
          <GlobeEventHandlerWrapper>
            <Globe name="myGlobe" minAltitude={500} maxAltitude={2500000}>
              <Layer />
              <VectorEventHandlerWrapper />
              <GeoImageComponent />
            </Globe>
          </GlobeEventHandlerWrapper>
          <CenterButton />
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
