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
import { Layer } from './components/globus/layer';
import { LineMarker } from './components/marks/selfMark.tsx';
import { TargetMarks } from './components/marks/targetMarks.tsx';
import { MarkerInfoModal } from './components/modals/markerInfo';

function App(): JSX.Element {
  const { language, getLanguageFromLocalStorage } = useSettingsStore((state) => ({
    language: state.language,
    getLanguageFromLocalStorage: state.getLanguageFromLocalStorage,
  }));

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  const getTagsFromLocalStorage = useTagsStore((state) => state.getTagsFromLocalStorage);

  useEffect(() => {
    getTagsFromLocalStorage();
    getLanguageFromLocalStorage();
  }, []);

  return (
    <ThemeWrapper>
      <MainContainer>
        <GlobeContextProvider>
          <EventHandlerWrapper>
            <Globe name="myGlobe">
              <Layer />
              <LineMarker />
              <TargetMarks />
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
