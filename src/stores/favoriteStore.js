import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 收藏清單，用 persist 存到 LocalStorage
export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (movie) => {
        const { favorites } = get();
        if (!favorites.find((item) => item.id === movie.id)) {
          set({ favorites: [...favorites, movie] });
        }
      },

      removeFavorite: (movieId) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((item) => item.id !== movieId) });
      },

      toggleFavorite: (movie) => {
        const { favorites, addFavorite, removeFavorite } = get();
        const isFavorited = favorites.some((item) => item.id === movie.id);
        
        if (isFavorited) {
          removeFavorite(movie.id);
        } else {
          addFavorite(movie);
        }
      },

      isFavorite: (movieId) => {
        const { favorites } = get();
        return favorites.some((item) => item.id === movieId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      getFavoriteCount: () => {
        return get().favorites.length;
      },
    }),
    {
      name: 'filmhub-favorites',
    }
  )
);

