import { create } from 'zustand';
import { geoImagesDB } from '../utils/geoImagesDB.ts';
import { ICoord } from '../interface/markers.ts';

export interface IGeoImg {
  leftTopCorner: Omit<ICoord, 'alt'>;
  rightTopCorner: Omit<ICoord, 'alt'>;
  rightBottomCorner: Omit<ICoord, 'alt'>;
  leftBottomCorner: Omit<ICoord, 'alt'>;
  src: string;
  uniqKey: string;
  isShown: boolean;
}

export interface GeoImgsStore {
  geoImgs: IGeoImg[];
  addImg: (img: IGeoImg) => Promise<void>;
  changeImage: (img: IGeoImg) => Promise<void>;
  deleteImage: (img: string) => Promise<void>;
  getGeoImgsFromIndexedDB: () => Promise<void>;
}

export const useGeoImgsStore = create<GeoImgsStore>((set) => ({
  geoImgs: [],

  addImg: async (img: IGeoImg) => {
    await geoImagesDB.addGeoImg(img);
    set((state) => ({ geoImgs: [...state.geoImgs, img] }));
  },

  changeImage: async (img: IGeoImg) => {
    await geoImagesDB.updateGeoImg(img);
    set((state) => ({
      geoImgs: state.geoImgs.map((geoImg) => (geoImg.uniqKey === img.uniqKey ? img : geoImg)),
    }));
  },

  deleteImage: async (key: string) => {
    await geoImagesDB.deleteGeoImg(key);
    set((state) => ({
      geoImgs: state.geoImgs.filter((geoImg) => geoImg.uniqKey !== key),
    }));
  },

  getGeoImgsFromIndexedDB: async () => {
    const geoImgs = await geoImagesDB.getGeoImages();
    set({ geoImgs });
  },
}));
