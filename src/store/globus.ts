import { create } from 'zustand';
import { ICoord } from './markers.ts';

export interface GlobusState {
  activeLayer: 'OSM' | 'SAT';
  setActiveLayer: (activeLayer: 'OSM' | 'SAT') => void;
  lookOnPosition: ICoord;
  setLookOnPosition: (data: ICoord) => void;
}

export const useGlobusStore = create<GlobusState>((set) => ({
  activeLayer: 'OSM',
  setActiveLayer: (activeLayer) => set({ activeLayer }),
  lookOnPosition: { lat: 0, lon: 0, alt: 0 },
  setLookOnPosition: (data) => set({ lookOnPosition: data }),
}));
