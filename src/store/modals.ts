import { create } from 'zustand';
import { ICoord, IMarker } from './markers.ts';

export interface ModalsState {
  addNewTargetState: {
    isOpen: boolean;
    coords: ICoord;
  };
  openNewTargetModal: (coords: ICoord) => void;
  closeNewTargetModal: () => void;

  markerInfoModalState: {
    isOpen: boolean;
    marker: IMarker;
  };
  openMarkerInfoModal: (data: IMarker) => void;
  closeMarkerInfoModal: () => void;
}

export const useModalStore = create<ModalsState>((set) => ({
  addNewTargetState: {
    coords: {
      lat: 0,
      alt: 0,
      lon: 0,
    },
    isOpen: false,
  },
  openNewTargetModal: (coords: ICoord) => set(() => ({ addNewTargetState: { coords, isOpen: true } })),
  closeNewTargetModal: () =>
    set(() => ({
      addNewTargetState: {
        coords: {
          lat: 0,
          alt: 0,
          lon: 0,
        },
        isOpen: false,
      },
    })),
  markerInfoModalState: {
    isOpen: false,
    marker: {
      notes: '',
      target: { src: '', value: '' },
      timeStamp: 0,
      coords: {
        lat: 0,
        lon: 0,
        alt: 0,
      },
      tags: [],
    },
  },
  openMarkerInfoModal: (data: IMarker) => set(() => ({ markerInfoModalState: { marker: data, isOpen: true } })),
  closeMarkerInfoModal: () =>
    set((prev) => ({
      markerInfoModalState: {
        ...prev.markerInfoModalState,
        isOpen: false,
      },
    })),
}));
