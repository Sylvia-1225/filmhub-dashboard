import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  searchQuery: '',
  selectedGenre: null,
  sortBy: 'popularity.desc',

  // 設定搜尋關鍵字
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // 設定選中的類型
  setSelectedGenre: (genreId) => {
    set({ selectedGenre: genreId });
  },

  // 設定排序方式
  setSortBy: (sortBy) => {
    set({ sortBy });
  },

  // 清除所有篩選條件
  clearFilters: () => {
    set({
      searchQuery: '',
      selectedGenre: null,
      sortBy: 'popularity.desc',
    });
  },
}));
