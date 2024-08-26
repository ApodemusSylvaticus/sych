import { create } from 'zustand';
import { ITarget } from './target.ts';
import { LocalStorage } from '../interface/localStorage.ts';

export interface ICoord {
  lon: number;
  lat: number;
  alt: number;
}

export interface IMarker {
  coords: ICoord;
  target: ITarget;
  tags: string[];
  timeStamp: number;
  notes: string;
}

export interface ISelfMarker {
  target: { value: 'SELF'; src: string };
  coords: ICoord;
  notes: string;
}

export interface MarkersStore {
  selfMarker: ISelfMarker;
  allMarkers: IMarker[];
  sessionMarkers: IMarker[];
  filteredMarkers: IMarker[];
  setFilteredMarkers: (value: IMarker[]) => void;
  addMarker: (marker: IMarker) => void;
  getMarkersFromLocalStorage: () => void;
}

export const useMarkerStore = create<MarkersStore>((set) => ({
  selfMarker: {
    coords: {
      lon: 14.42,
      lat: 50.07,
      alt: 235,
    },
    target: { value: 'SELF', src: '' },
    notes: '',
  },
  allMarkers: [],
  sessionMarkers: [],
  filteredMarkers: [],
  addMarker: (marker: IMarker) =>
    set((state) => {
      const newData = [...state.allMarkers, marker];
      localStorage.setItem(LocalStorage.MARKERS, JSON.stringify(newData));
      return { allMarkers: newData, sessionMarkers: [...state.sessionMarkers, marker] };
    }),
  setFilteredMarkers: (value: IMarker[]) => set({ filteredMarkers: value }),

  getMarkersFromLocalStorage: () =>
    set(() => {
      const localStorageData = localStorage.getItem(LocalStorage.MARKERS);
      const data: IMarker[] = localStorageData ? JSON.parse(localStorageData) : [];
      return { allMarkers: data };
    }),
}));
