import { create } from 'zustand';
import { ITarget } from './target.ts';

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
  addMarker: (marker: IMarker) => set((state) => ({ allMarkers: [...state.allMarkers, marker], sessionMarkers: [...state.sessionMarkers, marker] })),
  setFilteredMarkers: (value: IMarker[]) => set({ filteredMarkers: value }),
}));
