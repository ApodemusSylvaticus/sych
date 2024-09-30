import React from 'react';
import { useSettingsStore } from '../../../store/settings.ts';
import { Container, Divider, SelectionButton } from './style.ts';
import { languageArray } from '../../../i18n';
import { useGlobusStore } from '../../../store/globus.ts';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: React.FC = React.memo(() => {
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const language = useSettingsStore((state) => state.language);

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
  const activeLayer = useGlobusStore((state) => state.activeLayer);
  const setActiveLayer = useGlobusStore((state) => state.setActiveLayer);
  const { t } = useTranslation();
  return (
    <Container>
      <SelectionButton onClick={() => setActiveLayer('OSM')} isActive={activeLayer === 'OSM'}>
        {t('default_osm_layer')}
      </SelectionButton>
      <Divider />
      <SelectionButton onClick={() => setActiveLayer('SAT')} isActive={activeLayer === 'SAT'}>
        {t('default_sat_layer')}
      </SelectionButton>
    </Container>
  );
});
