import { create } from 'zustand';
import { ITarget } from './target.ts';
import { LocalStorage } from '../interface/localStorage.ts';
import { targetsDB } from '../utils/targetsDB.ts';

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
  uniqKey: string;
  files: string[];
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
  cleanAll: () => Promise<void>;
  setEmptyMarker: (markers: IEmptyMarker) => void;
  setFilteredMarkers: (value: IMarker[]) => void;
  updateMarker: (marker: IMarker) => Promise<void>;
  fillEmptyMarker: (marker: IMarker) => Promise<void>;
  addMarker: (marker: IMarker) => Promise<void>;
  getMarkersFromDB: () => Promise<void>;
}

export const useMarkerStore = create<MarkersStore>((set) => ({
  selfMarker: {
    coords: {
      lon: 0,
      lat: 0,
      alt: 0,
    },
    target: { value: 'SELF', src: '' },
    notes: '',
  },
  allMarkers: [],
  sessionMarkers: [],
  filteredMarkers: [],
  emptyMarkers: [],

  setSelfCoord: (data: ICoord) =>
    set((state) => ({
      selfMarker: { ...state.selfMarker, coords: data },
    })),

  cleanAll: async () => {
    localStorage.removeItem(LocalStorage.EMPTY_MARKERS);
    await targetsDB.clearAllMarkers();
    set({ allMarkers: [], emptyMarkers: [], sessionMarkers: [] });
  },

  setEmptyMarker: (data: IEmptyMarker) =>
    set((state) => {
      const updatedEmptyMarkers = [...state.emptyMarkers, data];
      localStorage.setItem(LocalStorage.EMPTY_MARKERS, JSON.stringify(updatedEmptyMarkers));
      return { emptyMarkers: updatedEmptyMarkers };
    }),

  addMarker: async (marker: IMarker) => {
    await targetsDB.addMarker(marker);
    set((state) => ({
      allMarkers: [...state.allMarkers, marker],
      sessionMarkers: [...state.sessionMarkers, marker],
    }));
  },

  setFilteredMarkers: (value: IMarker[]) => set({ filteredMarkers: value }),

  getMarkersFromDB: async () => {
    const data = await targetsDB.getMarkers();
    const localStorageEmptyData = localStorage.getItem(LocalStorage.EMPTY_MARKERS);
    const emptyData: IEmptyMarker[] = localStorageEmptyData ? JSON.parse(localStorageEmptyData) : [];

    set({
      allMarkers: data,
      emptyMarkers: emptyData,
    });
  },

  updateMarker: async (updatedMarker: IMarker) => {
    await targetsDB.updateMarker(updatedMarker);
    set((state) => ({
      allMarkers: state.allMarkers.map((marker) => (marker.timeStamp === updatedMarker.timeStamp ? updatedMarker : marker)),
      sessionMarkers: state.sessionMarkers.map((marker) => (marker.timeStamp === updatedMarker.timeStamp ? updatedMarker : marker)),
    }));
  },

  fillEmptyMarker: async (filledMarker: IMarker) => {
    await targetsDB.addMarker(filledMarker);

    set((state) => {
      const updatedEmptyMarkers = state.emptyMarkers.filter((emptyMarker) => emptyMarker.timeStamp !== filledMarker.timeStamp);
      localStorage.setItem(LocalStorage.EMPTY_MARKERS, JSON.stringify(updatedEmptyMarkers));

      return {
        emptyMarkers: updatedEmptyMarkers,
        allMarkers: [...state.allMarkers, filledMarker],
        sessionMarkers: [...state.sessionMarkers, filledMarker],
      };
    });
  },
}));
