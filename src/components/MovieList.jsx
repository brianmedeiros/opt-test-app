import { MovieCard } from "./MovieCard";

/**
 *display grid of movie cards
 *
 * @param {Array} movies - Array of movie objects
 * @param {function} isFavorite - Function to check if a movie is favorite
 * @param {function} onToggleFavorite - Function to toggle favorite status of a movie
 */

export function MovieList({ movies, isFavorite, onToggleFavorite }) {
    if (!movies || movies.length === 0) {
        return (
            <div className="movie-list-empty">No movies available</div>
        );
    }

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={isFavorite(movie.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
}