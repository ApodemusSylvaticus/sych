import { create } from 'zustand';
import { ITarget, TargetTypeEnum } from '../interface/markers.ts';

export type ITargetState = {
  targets: ITarget[];
};

const initialState: ITargetState = {
  targets: [
    { src: '', value: 'default_enemy', type: TargetTypeEnum.target },
    { src: '', value: 'default_enemy_stock', type: TargetTypeEnum.target },
    { src: '', value: 'default_enemy_group', type: TargetTypeEnum.target },
    { src: '', value: 'default_enemy_artillery', type: TargetTypeEnum.target },
  ],
};

export const useTargetStore = create<ITargetState>(() => initialState);
