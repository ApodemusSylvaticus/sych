import { ICoord } from './markers.ts';
import { create } from 'zustand';

export interface IdXdY {
  x: number;
  y: number;
}

export interface PopupState {
  coords: ICoord;
  dXdY: IdXdY;
  isOpen: boolean;
  openPopup: (data: { dXdY: IdXdY; coords: ICoord }) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  coords: {
    lat: 0,
    alt: 0,
    lon: 0,
  },
  dXdY: {
    x: 0,
    y: 0,
  },
  openPopup: (data) => set(() => ({ dXdY: data.dXdY, coords: data.coords, isOpen: true })),
  closePopup: () => set(() => ({ isOpen: false })),
}));
