import { create } from 'zustand';

export interface ModalsState {
  timeFilter: {
    from: number;
    to: number;
  };
  onlySession: boolean;
  tagFilter: string[];
  typeFilter: string[];

  addTimeFilter: (data: { from: number; to: number }) => void;
  addTagFilter: (data: string[]) => void;
  addTypeFilter: (data: string[]) => void;
}

export const useFilterStore = create<ModalsState>((set) => ({
  tagFilter: [],
  timeFilter: { from: -1, to: -1 },
  typeFilter: [],
  onlySession: false,
  addTagFilter: (data) => set({ tagFilter: data }),
  addTypeFilter: (data) => set({ typeFilter: data }),
  addTimeFilter: (data) => set({ timeFilter: data }),
}));
