import { useMovies } from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import { MovieList } from '../components/MovieList';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

/**
 * Home page
 */

export function HomePage() {
    // fetch trending movies of the week
    const { movies, loading, error } = useMovies('week');

    // get favorites
    const { isFavorite, toggleFavorite } = useFavorites();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <ErrorMessage
                message={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    // movie list
    return (
        <div className="home-page">
            <section className='page-header'>
                <h1>Trending Movies</h1>
                <p>Discover the most popular movies of the week</p>
            </section>

            <MovieList
                movies={movies}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
            />
        </div>
    );
}