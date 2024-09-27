import { create } from 'zustand';
import { LocalStorage } from '../interface/localStorage.ts';
import { targetsDB } from '../utils/targetsDB.ts';
import { ICoord, IEmptyMarker, IMarker, ISelfMarker, TargetTypeEnum } from '../interface/markers.ts';

export interface MarkersStore {
  selfMarker: ISelfMarker;
  allMarkers: IMarker[];
  emptyMarkers: IEmptyMarker[];
  sessionMarkers: IMarker[];
  filteredMarkers: IMarker[];
  setSelfCoords: (data: ICoord) => void;
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
      lon: 45,
      lat: 30,
      alt: 0,
    },
    target: { value: 'SELF', src: '', type: TargetTypeEnum.self },
    uniqKey: '',
  },
  allMarkers: [],
  sessionMarkers: [],
  filteredMarkers: [],
  emptyMarkers: [],

  setSelfCoords: (data: ICoord) =>
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
