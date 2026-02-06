import {Link} from "react-router";

// url for tmdb images
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

/**
 * Displays movie as a card
 *
 * @param {object} movie - Movie data from tmdb api
 * @param {boolean} isFavorite - Whether this movie is favorited
 * @param {function} onToggleFavorite - Callback when favorite button clicked
 */

export function MovieCard({movie, isFavorite, onToggleFavorite}) {
    // construct image url
    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}/w300${movie.poster_path}`
        : 'placeholder-poster.png'; // fallback image

        // extract release year
        const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'Unknown';

        // favourite button
        const handleFavoriteClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(movie);
        };

    return (
        <article className="movie-card">
            <Link to={`/movie/${movie.id}`} className="movie-card-link">
                {/* Poster Image */}
                <div className="movie-card-poster">
                    <img
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                        loading="lazy"
                    />

                    {/* Favorite Button - overlaid on poster */}
                    <button
                        onClick={handleFavoriteClick}
                        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>

                {/* Movie Info */}
                <div className="movie-card-info">
                    <h3 className="movie-card-title">{movie.title}</h3>
                    <div className="movie-card-meta">
                        <span className="movie-card-year">{releaseYear}</span>
                        <span className="movie-card-rating">
                            {movie.vote_average?.toFixed(1) || 'N/A'}
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
