// 用 React Query 處理電影資料，自動 cache 跟 refetch
import { useQuery } from '@tanstack/react-query';
import apiService from '@/services/apiService';

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => apiService.movie.getPopularMovies(page),
  });
}

export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: ['nowPlayingMovies', page],
    queryFn: () => apiService.movie.getNowPlayingMovies(page),
  });
}

export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: ['upcomingMovies', page],
    queryFn: () => apiService.movie.getUpcomingMovies(page),
  });
}

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: ['topRatedMovies', page],
    queryFn: () => apiService.movie.getTopRatedMovies(page),
  });
}

export function useTrendingMovies(timeWindow = 'day') {
  return useQuery({
    queryKey: ['trendingMovies', timeWindow],
    queryFn: () => apiService.movie.getTrendingMovies(timeWindow),
  });
}

export function useMovieDetails(movieId) {
  return useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => apiService.movie.getMovieDetails(movieId),
    enabled: !!movieId,
  });
}

export function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ['searchMovies', query, page],
    queryFn: () => apiService.search.searchMovies(query, page),
    enabled: !!query && query.trim().length > 0,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => apiService.movie.getGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24 小時不會重新請求
    // cacheTime: Infinity, // 可以考慮永久quickCache，因為類型真的很少變動
  });
}

// 依類型取得電影
export function useMoviesByGenre(genreId, page = 1) {
  return useQuery({
    queryKey: ['moviesByGenre', genreId, page],
    queryFn: () => apiService.movie.getMoviesByGenre(genreId, page),
    enabled: !!genreId,
  });
}

// 取得相似電影
export function useSimilarMovies(movieId, page = 1) {
  return useQuery({
    queryKey: ['similarMovies', movieId, page],
    queryFn: () => apiService.movie.getSimilarMovies(movieId, page),
    enabled: !!movieId,
  });
}

// 取得電影推薦
// NOTE: Similar 和 Recommendations 的差異：
// - Similar: 基於類型、關鍵字等相似度
// - Recommendations: TMDB 的推薦演算法
export function useMovieRecommendations(movieId, page = 1) {
  return useQuery({
    queryKey: ['movieRecommendations', movieId, page],
    queryFn: () => apiService.movie.getMovieRecommendations(movieId, page),
    enabled: !!movieId,
  });
}

