import { useQuery } from '@tanstack/react-query';
import apiService from '@/services/apiService';

// 取得熱門電影
export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => apiService.movie.getPopularMovies(page),
  });
}

// 取得正在上映電影
export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: ['nowPlayingMovies', page],
    queryFn: () => apiService.movie.getNowPlayingMovies(page),
  });
}

// 取得即將上映電影
export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: ['upcomingMovies', page],
    queryFn: () => apiService.movie.getUpcomingMovies(page),
  });
}

// 取得最高評分電影
export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: ['topRatedMovies', page],
    queryFn: () => apiService.movie.getTopRatedMovies(page),
  });
}

// 取得趨勢電影
export function useTrendingMovies(timeWindow = 'day') {
  return useQuery({
    queryKey: ['trendingMovies', timeWindow],
    queryFn: () => apiService.movie.getTrendingMovies(timeWindow),
  });
}

// 取得電影詳情
export function useMovieDetails(movieId) {
  return useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => apiService.movie.getMovieDetails(movieId),
    enabled: !!movieId,
  });
}

// 搜尋電影
export function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ['searchMovies', query, page],
    queryFn: () => apiService.search.searchMovies(query, page),
    enabled: !!query && query.trim().length > 0,
  });
}

// 取得電影類型列表
export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => apiService.movie.getGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24 小時
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
export function useMovieRecommendations(movieId, page = 1) {
  return useQuery({
    queryKey: ['movieRecommendations', movieId, page],
    queryFn: () => apiService.movie.getMovieRecommendations(movieId, page),
    enabled: !!movieId,
  });
}
