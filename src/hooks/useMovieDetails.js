import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';

/**
 * Custom hook for fetching movie details by ID
 *
 * @param {number|string} movieId - ID of the movie
 * @returns {object} - { movie, loading, error }
 */

export function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    // flag to track if component is mounted
    let cancelled = false;

    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);

        if (!cancelled) {
          setMovie(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Error fetching movie details');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMovie();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return { movie, loading, error };
}
