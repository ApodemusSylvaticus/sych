import { create } from 'zustand';

export interface ModalsState {
  timeFilter: {
    from: number;
    to: number;
  };
  isTimeFilterEnabled: boolean;
  switchTimeFilter: () => void;
  tagFilter: string[];
  isTagFilterEnabled: boolean;
  switchTagFilter: () => void;
  typeFilter: string[];
  isTypeFilterEnabled: boolean;
  switchTypeFilter: () => void;
  onlySession: boolean;
  setOnlySession: (data: boolean) => void;
  addTimeFilter: (data: { from: number; to: number }) => void;
  addTagFilter: (data: string[]) => void;
  addTypeFilter: (data: string[]) => void;
}

export const useFilterStore = create<ModalsState>((set) => ({
  tagFilter: [],
  isTagFilterEnabled: false,
  switchTagFilter: () => set((state) => ({ ...state, isTagFilterEnabled: !state.isTagFilterEnabled })),
  timeFilter: { from: -1, to: -1 },
  isTimeFilterEnabled: false,
  switchTimeFilter: () => set((state) => ({ ...state, isTimeFilterEnabled: !state.isTimeFilterEnabled })),
  typeFilter: [],
  isTypeFilterEnabled: false,
  switchTypeFilter: () => set((state) => ({ ...state, isTypeFilterEnabled: !state.isTypeFilterEnabled })),
  onlySession: false,
  setOnlySession: (data: boolean) => set({ onlySession: data }),
  addTagFilter: (data) => set({ tagFilter: data }),
  addTypeFilter: (data) => set({ typeFilter: data }),
  addTimeFilter: (data) => set({ timeFilter: data }),
}));
