import { create } from 'zustand';

export enum IMarkerEnum {
  SELF,
  TARGET,
}

export interface ITarget {
  value: IMarkerEnum;
  src: string;
}

export type ITargetState = {
  targets: { [K in IMarkerEnum]: ITarget };
};

const initialState: ITargetState = {
  targets: {
    [IMarkerEnum.SELF]: { value: IMarkerEnum.SELF, src: '' },
    [IMarkerEnum.TARGET]: { value: IMarkerEnum.TARGET, src: '' },
  },
};

export const useTargetStore = create<ITargetState>(() => initialState);
