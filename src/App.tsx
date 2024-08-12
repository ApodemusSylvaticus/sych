import { useEffect, useState } from 'react';
import { Billboard, Entity, Globe, GlobeContextProvider, Vector } from '@openglobus/openglobus-react';
import './App.css';
import { MainContainer } from './components/containers/style.ts';
import { MenuManipulationButton } from './components/menu';
import { ThemeWrapper } from './wrappers/theme';
import { useMarkerStore } from './store/markers.ts';
import { EventHandlerWrapper } from './wrappers/eventHandlerWrapper';
import { RClickPopup } from './components/popup/rClick';
import { AddTargetModal } from './components/modals/addTarget';
import { useTagsStore } from './store/tags.ts';
import { useSettingsStore } from './store/settings.ts';
import i18n from 'i18next';
import { Layer } from './components/globus/layer';
import LineMarker from './components/mark.tsx';

function App(): JSX.Element {
  const { language, getLanguageFromLocalStorage } = useSettingsStore((state) => ({
    language: state.language,
    getLanguageFromLocalStorage: state.getLanguageFromLocalStorage,
  }));
  const { selfMarker, filtered } = useMarkerStore((state) => ({
    selfMarker: state.selfMarker,
    filtered: state.filteredMarkers,
  }));
  console.log('rerender');

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  const getTagsFromLocalStorage = useTagsStore((state) => state.getTagsFromLocalStorage);

  const handleGlobeClick = (event: any) => {
    console.log(event);
  };

  useEffect(() => {
    getTagsFromLocalStorage();
    getLanguageFromLocalStorage();
  }, []);

  return (
    <ThemeWrapper>
      <MainContainer>
        <GlobeContextProvider>
          <EventHandlerWrapper>
            <Globe name="myGlobe" onLdown={handleGlobeClick} onMclick={handleGlobeClick} onMouseMove={handleGlobeClick}>
              <Layer />

              <Vector name="filtered-markers">
                {filtered.map((el, index) => (
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

              <LineMarker />
            </Globe>
          </EventHandlerWrapper>
          <MenuManipulationButton />
        </GlobeContextProvider>

        <RClickPopup />
        <AddTargetModal />
      </MainContainer>
    </ThemeWrapper>
  );
}

export default App;
