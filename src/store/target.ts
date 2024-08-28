import { create } from 'zustand';

export interface ITarget {
  value: string;
  src: string;
  type: 'self' | 'target' | 'empty';
}

export type ITargetState = {
  targets: ITarget[];
};

const initialState: ITargetState = {
  targets: [
    { src: '', value: 'default_enemy', type: 'target' },
    { src: '', value: 'default_enemy_stock', type: 'target' },
    { src: '', value: 'default_enemy_group', type: 'target' },
    { src: '', value: 'default_enemy_artillery', type: 'target' },
  ],
};

export const useTargetStore = create<ITargetState>(() => initialState);
