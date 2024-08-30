import { create } from 'zustand';

export interface GlobusState {
  activeLayer: 'OSM' | 'SAT';
  setActiveLayer: (activeLayer: 'OSM' | 'SAT') => void;
  azimuth: number;
  setAzimuth: (data: number) => void;
}

export const useGlobusStore = create<GlobusState>((set) => ({
  activeLayer: 'OSM',
  setActiveLayer: (activeLayer) => set({ activeLayer }),
  azimuth: 0,
  setAzimuth: (data) => set({ azimuth: data }),
}));
