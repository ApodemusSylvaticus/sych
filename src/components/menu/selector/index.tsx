import React from 'react';
import { useSettingsStore } from '../../../store/settings.ts';
import { Container, Divider, SelectionButton } from './style.ts';
import { languageArray } from '../../../i18n';
import { useGlobusStore } from '../../../store/globus.ts';

export const LanguageSelector: React.FC = React.memo(() => {
  const { setLanguage, language } = useSettingsStore((state) => ({ language: state.language, setLanguage: state.setLanguage }));

  return (
    <Container>
      <SelectionButton onClick={() => setLanguage(languageArray[0].simbol)} isActive={language === languageArray[0].simbol}>
        {languageArray[0].value}
      </SelectionButton>
      <Divider />
      <SelectionButton onClick={() => setLanguage(languageArray[1].simbol)} isActive={language === languageArray[1].simbol}>
        {languageArray[1].value}
      </SelectionButton>
    </Container>
  );
});

export const LayerSelector: React.FC = React.memo(() => {
  const { activeLayer, setActiveLayer } = useGlobusStore((state) => ({ activeLayer: state.activeLayer, setActiveLayer: state.setActiveLayer }));

  return (
    <Container>
      <SelectionButton onClick={() => setActiveLayer('OSM')} isActive={activeLayer === 'OSM'}>
        OSM Layer
      </SelectionButton>
      <Divider />
      <SelectionButton onClick={() => setActiveLayer('SAT')} isActive={activeLayer === 'SAT'}>
        SAT Layer
      </SelectionButton>
    </Container>
  );
});
