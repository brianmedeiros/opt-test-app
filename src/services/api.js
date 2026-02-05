// values from env
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
    return fetchFromApi(`/trending/movie/${timeWindow}`);
}

// get movie details by id
export async function getMovieDetails(movieId) {
    return fetchFromApi(`/movie/${movieId}`);
}