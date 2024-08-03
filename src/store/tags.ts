import { create } from 'zustand';
import { LocalStorage } from '../interface/localStorage.ts';

export interface ITagsStore {
  tagsList: Array<string>;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  getTagsFromLocalStorage: () => void;
}

export const useTagsStore = create<ITagsStore>((set) => ({
  tagsList: ['crossroads', 'group', 'enemy', 'stock'],

  addTag: (tag: string) =>
    set((state) => {
      if (!state.tagsList.includes(tag)) {
        const newList = [...state.tagsList, tag];
        localStorage.setItem(LocalStorage.TAGS, JSON.stringify(newList));
        return { tagsList: newList };
      }
      return state;
    }),

  removeTag: (tag: string) =>
    set((state) => {
      const newList = state.tagsList.filter((t) => t !== tag);
      localStorage.setItem(LocalStorage.TAGS, JSON.stringify(newList));
      return { tagsList: newList };
    }),

  getTagsFromLocalStorage: () => {
    const storedTags = localStorage.getItem(LocalStorage.TAGS);
    if (storedTags) {
      set({ tagsList: JSON.parse(storedTags) });
    }
  },
}));
