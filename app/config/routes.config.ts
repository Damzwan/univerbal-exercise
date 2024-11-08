export enum AppRoutes {
  Root = 'tab-home',
  TopRated = 'tab-top-rated',
  Favorites = 'tab-favorites',
  FavoritesMovies = 'favorites-movies',
  FavoritesTvSeries = 'favorites-tv-series',
  Movie = 'movie',
  TvSeries = 'tv-series',
}

// Optional: Map specific routes to their respective icons
export const routeIconMapping: Partial<Record<AppRoutes, string>> = {
  [AppRoutes.Root]: 'home',
  [AppRoutes.TopRated]: 'star',
  [AppRoutes.Favorites]: 'heart',
  [AppRoutes.FavoritesMovies]: 'movie-icon',
  [AppRoutes.FavoritesTvSeries]: 'tv-icon',
};
