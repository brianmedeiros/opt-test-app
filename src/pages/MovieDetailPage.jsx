import { useParams, Link } from 'react-router';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useFavorites } from '../hooks/useFavorites';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

/**
 * Movie detail page
 */

export function MovieDetailPage() {
  // get movie id from url params
  const { movieId } = useParams();
  // fetch movie details
  const { movie, loading, error } = useMovieDetails(movieId);
  // favorites
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  // if movie not found
  if (!movie) {
    return <ErrorMessage message="Movie not found" />;
  }

  // construct poster url
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
    : '/images/placeholder-poster.png';

  // runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // movie date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // check if movie is favorite
  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div className="movie-detail-page">
      {/* Back Navigation */}
      <nav className="detail-nav">
        <Link to="/" className="back-link">
          ← Back to Movies
        </Link>
      </nav>

      {/* Main Content */}
      <div className="movie-detail-content">
        {/* Poster */}
        <div className="movie-detail-poster">
          <img src={posterUrl} alt={`${movie.title} poster`} />
        </div>

        {/* Info */}
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title}</h1>

          {movie.tagline && <p className="movie-detail-tagline">"{movie.tagline}"</p>}

          {/* Meta Information */}
          <div className="movie-detail-meta">
            <span className="meta-item">{formatDate(movie.release_date)}</span>
            <span className="meta-item">{formatRuntime(movie.runtime)}</span>
            <span className="meta-item">{movie.vote_average?.toFixed(1)} / 10</span>
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="movie-detail-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="movie-detail-overview">
            <h2>Overview</h2>
            <p>{movie.overview || 'No overview available.'}</p>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(movie)}
            className={`favorite-button-large ${isMovieFavorite ? 'is-favorite' : ''}`}
          >
            {isMovieFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
