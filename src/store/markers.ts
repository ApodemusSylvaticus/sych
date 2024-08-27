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

export interface IEmptyMarker {
  coord: ICoord;
  timeStamp: number;
}

export interface ISelfMarker {
  target: { value: 'SELF'; src: string };
  coords: ICoord;
  notes: string;
}

export interface MarkersStore {
  selfMarker: ISelfMarker;
  allMarkers: IMarker[];
  emptyMarkers: IEmptyMarker[];
  sessionMarkers: IMarker[];
  filteredMarkers: IMarker[];
  setSelfCoord: (data: ICoord) => void;
  setEmptyMarker: (markers: IEmptyMarker) => void;
  setFilteredMarkers: (value: IMarker[]) => void;
  updateMarker: (marker: IMarker) => void;
  fillEmptyMarker: (marker: IMarker) => void;
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
  setSelfCoord: (data: ICoord) => set((state) => ({ selfMarker: { ...state.selfMarker, coords: data } })),
  emptyMarkers: [],
  setEmptyMarker: (data: IEmptyMarker) =>
    set((state) => {
      const updatedEmptyMarkers = [...state.emptyMarkers, data];
      localStorage.setItem(LocalStorage.EMPTY_MARKERS, JSON.stringify(updatedEmptyMarkers));
      return { emptyMarkers: updatedEmptyMarkers };
    }),
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

      const localStorageEmptyData = localStorage.getItem(LocalStorage.EMPTY_MARKERS);
      const emptyData: IEmptyMarker[] = localStorageEmptyData ? JSON.parse(localStorageEmptyData) : [];

      return {
        allMarkers: data,
        emptyMarkers: emptyData,
      };
    }),

  updateMarker: (updatedMarker: IMarker) =>
    set((state) => {
      const updatedMarkers = state.allMarkers.map((marker) => (marker.timeStamp === updatedMarker.timeStamp ? updatedMarker : marker));
      localStorage.setItem(LocalStorage.MARKERS, JSON.stringify(updatedMarkers));
      return {
        allMarkers: updatedMarkers,
        sessionMarkers: state.sessionMarkers.map((marker) => (marker.timeStamp === updatedMarker.timeStamp ? updatedMarker : marker)),
      };
    }),
  fillEmptyMarker: (filledMarker: IMarker) =>
    set((state) => {
      const updatedEmptyMarkers = state.emptyMarkers.filter((emptyMarker) => emptyMarker.timeStamp !== filledMarker.timeStamp);
      const updatedAllMarkers = [...state.allMarkers, filledMarker];
      localStorage.setItem(LocalStorage.MARKERS, JSON.stringify(updatedAllMarkers));
      localStorage.setItem(LocalStorage.EMPTY_MARKERS, JSON.stringify(updatedEmptyMarkers));
      return {
        emptyMarkers: updatedEmptyMarkers,
        allMarkers: updatedAllMarkers,
        sessionMarkers: [...state.sessionMarkers, filledMarker],
      };
    }),
}));
