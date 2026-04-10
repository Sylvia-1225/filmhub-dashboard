import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      
      // 新增收藏
      addFavorite: (movie) => {
        const { favorites } = get();
        if (!favorites.find((item) => item.id === movie.id)) {
          set({ favorites: [...favorites, movie] });
        }
      },

      // 移除收藏
      removeFavorite: (movieId) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((item) => item.id !== movieId) });
      },

      // 切換收藏狀態
      toggleFavorite: (movie) => {
        const { favorites, addFavorite, removeFavorite } = get();
        const isFavorited = favorites.some((item) => item.id === movie.id);
        if (isFavorited) {
          removeFavorite(movie.id);
        } else {
          addFavorite(movie);
        }
      },

      // 檢查是否已收藏
      isFavorite: (movieId) => {
        const { favorites } = get();
        return favorites.some((item) => item.id === movieId);
      },

      // 清空所有收藏
      clearFavorites: () => {
        set({ favorites: [] });
      },

      // 取得收藏數量
      getFavoriteCount: () => {
        return get().favorites.length;
      },
    }),
    {
      name: 'filmhub-favorites',
    }
  )
);
