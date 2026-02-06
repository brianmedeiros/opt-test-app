import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'favoriteMovies';

/**
 * Load favorites from localStorage
 * return empty array if none
 */

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load favorites:', error);
    return [];
  }
}

/**
 * Save favorites to localStorage
 */
function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
}

/**
 * Custom hook for managing favorite movies
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  // add movie to favorites localStorage
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // add movie to favorites
  const addFavorite = useCallback((movie) => {
    setFavorites((currentFavorites) => {
      // avoid duplicates
      const alreadyExists = currentFavorites.some((fav) => fav.id === movie.id);

      if (alreadyExists) {
        return currentFavorites;
      }
      return [...currentFavorites, movie];
    });
  }, []);

  // remove movie from favorites
  const removeFavorite = useCallback((movieId) => {
    setFavorites((currentFavorites) => currentFavorites.filter((fav) => fav.id !== movieId));
  }, []);

  // check if movie is favorite
  const isFavorite = useCallback(
    (movieId) => {
      return favorites.some((fav) => fav.id === movieId);
    },
    [favorites]
  );

  // toggle favorite status
  const toggleFavorite = useCallback(
    (movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
