import { useState, useEffect } from "react";
import { getTrendingMovies } from "../services/api";

export function useMovies(timeWindow = 'week') {
    // state for movies
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // flag to track if component is mounted
        let cancelled = false;

        async function fetchMovies() {
            try {
                // start loading, clear error
                setLoading(true);
                setError(null);

                const data = await getTrendingMovies(timeWindow);

                // update state
                if (!cancelled) {
                    setMovies(data.results || []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Error fetching movies');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        fetchMovies();

        // cleanup function
        return () => {
            cancelled = true;
        };

    }, [timeWindow]);

}