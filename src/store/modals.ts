import { create } from 'zustand';
import { ICoord, TargetTypeEnum } from '../interface/markers.ts';
import { Nullable } from '../interface/baseComponentsInterface.ts';

export interface ModalsState {
  addNewTargetState: {
    isOpen: boolean;
    coords: ICoord;
  };
  openNewTargetModal: (coords: ICoord) => void;
  closeNewTargetModal: () => void;

  markerInfoModalState: {
    isOpen: boolean;
    marker: Nullable<{ uniqKey: string; type: TargetTypeEnum }>;
  };
  openMarkerInfoModal: (data: { uniqKey: string; type: TargetTypeEnum }) => void;
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
    marker: null,
  },
  openMarkerInfoModal: (data) => set(() => ({ markerInfoModalState: { marker: data, isOpen: true } })),
  closeMarkerInfoModal: () =>
    set(() => ({
      markerInfoModalState: {
        isOpen: false,
        marker: null,
      },
    })),
}));
