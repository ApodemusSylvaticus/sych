import { create } from 'zustand';

export interface GlobusState {
  activeLayer: 'OSM' | 'SAT';
  setActiveLayer: (activeLayer: 'OSM' | 'SAT') => void;
}

export const useGlobusStore = create<GlobusState>((set) => ({
  activeLayer: 'OSM',
  setActiveLayer: (activeLayer) => set({ activeLayer }),
}));
