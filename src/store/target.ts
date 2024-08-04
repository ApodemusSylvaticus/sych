import { create } from 'zustand';

export interface ITarget {
  value: string;
  src: string;
}

export type ITargetState = {
  targets: ITarget[];
};

const initialState: ITargetState = {
  targets: [
    { src: '', value: 'Enemy' },
    { src: '', value: 'Enemy-stock' },
    { src: '', value: 'Enemy-group' },
    { src: '', value: 'Enemy-artillery' },
  ],
};

export const useTargetStore = create<ITargetState>(() => initialState);
