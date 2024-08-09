import { create } from 'zustand';
import { languageSimbolArray } from '../i18n';
import { LocalStorage } from '../interface/localStorage.ts';

export interface SettingsState {
  language: string;
  setLanguage: (data: string) => void;
  getLanguageFromLocalStorage: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: languageSimbolArray[0],
  setLanguage: (language) =>
    set(() => {
      localStorage.setItem(LocalStorage.LANGUAGE, JSON.stringify(language));
      return { language };
    }),
  getLanguageFromLocalStorage: () =>
    set(() => {
      const temp = localStorage.getItem(LocalStorage.LANGUAGE);
      return { language: temp ? JSON.parse(temp) : languageSimbolArray[0] };
    }),
}));
