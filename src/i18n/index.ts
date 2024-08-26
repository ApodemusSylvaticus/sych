import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import translationData from './data.json';

export const { languageSimbolArray } = translationData;

const resources = {};

interface Language {
  simbol: string;
  value: string;
  isLTR: boolean;
}
export const languageArray: Language[] = [];

languageSimbolArray.forEach((el) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  resources[el] = { translation: translationData[el].data };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  languageArray.push({ simbol: el, value: translationData[el].name, isLTR: translationData[el].isLTR });
});

i18n.use(initReactI18next).init({
  resources,

  lng: 'en',
  compatibilityJSON: 'v3',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
