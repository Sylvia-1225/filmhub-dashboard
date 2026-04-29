import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRatingStore = create(
  persist(
    (set, get) => ({
      ratings: {},
      reviews: {},

      setRating: (movieId, rating) => {
        const { ratings } = get();
        set({ ratings: { ...ratings, [movieId]: rating } });
      },

      getRating: (movieId) => {
        return get().ratings[movieId] || 0;
      },

      removeRating: (movieId) => {
        const { ratings } = get();
        const newRatings = { ...ratings };
        delete newRatings[movieId];
        set({ ratings: newRatings });
      },

      setReview: (movieId, review) => {
        const { reviews } = get();
        set({
          reviews: {
            ...reviews,
            [movieId]: {
              content: review,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          },
        });
      },

      // 取得評論
      getReview: (movieId) => {
        return get().reviews[movieId] || null;
      },

      // 移除評論
      removeReview: (movieId) => {
        const { reviews } = get();
        const newReviews = { ...reviews };
        delete newReviews[movieId];
        set({ reviews: newReviews });
      },

      // 取得所有已評分的電影 ID 列表
      getRatedMovieIds: () => {
        return Object.keys(get().ratings);
      },

      // 取得所有已評論的電影 ID 列表
      getReviewedMovieIds: () => {
        return Object.keys(get().reviews);
      },
    }),
    {
      name: 'filmhub-ratings',
    }
  )
);
