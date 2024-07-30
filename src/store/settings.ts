import { create } from 'zustand';

export interface SettingsState {
  language: 'en';
  setLanguage: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'en',
  setLanguage: () => {},
}));
