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
    { src: '', value: 'default_enemy' },
    { src: '', value: 'default_enemy_stock' },
    { src: '', value: 'default_enemy_group' },
    { src: '', value: 'default_enemy_artillery' },
  ],
};

export const useTargetStore = create<ITargetState>(() => initialState);
