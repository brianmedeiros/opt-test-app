// values from env
import { getCache, setCache } from "./cache";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// function to fetch data from the API
async function fetchFromApi(endpoint) {

    // Construct the full URL
    const url = `${BASE_URL}${endpoint}`;

    // Bearer token authentication
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    };

    // http request
    const response = await fetch(url, options);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    // Return the JSON response
    return await response.json();
}

// get trending movies for period of time
export async function getTrendingMovies(timeWindow = 'week') {
    // create cache key
    const cacheKey = `trending_${timeWindow}`;

    // check cache first
    const cached = getCache(cacheKey);
    if (cached) {
        console.log('Returning cached for trending movies');
        return cached;
    }

    // fetch from API
    console.log('Fetching from API for trending movies');
    const data = await fetchFromApi(`/trending/movie/${timeWindow}`);

    // store in cache
    setCache(cacheKey, data);

    return data;
}

// get movie details by id
export async function getMovieDetails(movieId) {
    const cacheKey = `movie_${movieId}`;

    // check cache first
    const cached = getCache(cacheKey);
    if (cached) {
        console.log('Returning cached for movie details');
        return cached;
    }

    // fetch from API
    console.log('Fetching from API for movie details');
    const data = await fetchFromApi(`/movie/${movieId}`);
    setCache(cacheKey, data);

    return data;
}
