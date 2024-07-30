import { create } from 'zustand';

export interface ICoord {
  lon: number;
  lat: number;
  alt: number;
}

export enum IMarkerEnum {
  SELF,
  TARGET,
}

export interface IMarker {
  coords: ICoord;
  type: IMarkerEnum;
  tags: string[];
  timeStamp: number;
}

export interface ISelfMarker {
  type: IMarkerEnum.SELF;
  coords: ICoord;
}

export interface MarkersStore {
  selfMarker: ISelfMarker;
  allMarkers: IMarker[];
  sessionMarkers: IMarker[];
  filteredMarkers: IMarker[];
}

export const useMarkerStore = create<MarkersStore>((set) => ({
  selfMarker: {
    coords: {
      lon: 14.42,
      lat: 50.07,
      alt: 235,
    },
    type: IMarkerEnum.SELF,
  },
  allMarkers: [],
  sessionMarkers: [],
  filteredMarkers: [{ timeStamp: 13123123, coords: { lat: 51.0704152, lon: 14.420122, alt: 248 }, type: IMarkerEnum.TARGET, tags: [] }],
}));
