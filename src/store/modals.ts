import { create } from 'zustand';
import { ICoord } from './markers.ts';

export interface ModalsState {
  addNewTargetState: {
    isOpen: boolean;
    coords: ICoord;
  };
  openNewTargetModal: (coords: ICoord) => void;
  closeNewTargetModal: () => void;
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
}));
