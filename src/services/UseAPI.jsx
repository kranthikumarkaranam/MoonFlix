// Importing the custom hook useHttp for handling HTTP requests
import useHttp from './UseHttp';

// Custom hook useAPI for managing API calls and fetching movie data
export default function useAPI() {
	// Base URL for the MovieDB API
	const API = 'https://api.themoviedb.org/3/';
	// API Key for authenticating requests (retrieved from environment variables)
	const APIKEY = `api_key=${process.env.REACT_APP_TMDB_KEY}`;

	// Destructuring the returned values from the useHttp hook
	const { request, loading, error } = useHttp();

	// Function to get a list of movies based on category, genre, and page number
	const getMovies = async (category = null, genre = null, page = 1) => {
		let url = '';

		// If a specific genre is provided, fetch movies based on that genre
		if (genre) {
			url = `${API}discover/movie?${APIKEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genre}`;
		} else {
			// Otherwise, fetch movies based on the given category
			switch (category) {
				case 'popular':
					url = `${API}movie/popular?${APIKEY}&language=en-US&page=${page}`;
					break;

				case 'top-rated':
					url = `${API}movie/top_rated?${APIKEY}&language=en-US&page=${page}`;
					break;

				case 'upcoming':
					url = `${API}movie/upcoming?${APIKEY}&language=en-US&page=${page}`;
					break;

				default:
					break;
			}
		}
		// Making an HTTP request to fetch the movies and returning the response
		return await request(url);
	};

	// Function to get detailed information about a single movie by its ID
	const getMovie = async (id) => {
		return await request(
			`${API}movie/${id}?${APIKEY}&language=en-US&append_to_response=videos,assets,credits`
		);
	};

	// Function to get a list of recommended movies for a given movie ID
	const getRecommendMovies = async (id, page = 1) => {
		return await request(
			`${API}movie/${id}/recommendations?${APIKEY}&language=en-US&page=${page}`
		);
	};

	// Function to get detailed information about an actor by their ID
	const getActor = async (id) => {
		return await request(`${API}person/${id}?${APIKEY}`);
	};

	// Function to search for movies, TV shows, and people based on a query value
	const searchData = async (value) => {
		return await request(`${API}search/multi?${APIKEY}&query=${value}&page=1`);
	};

	// Function to get movies in which a specific actor is featured
	const getMoviesWithActor = async (id, page = 1) => {
		return await request(
			`${API}discover/movie?${APIKEY}&with_cast=${id}&page=${page}`
		);
	};

	// Exposing the necessary functions and data to the components using this hook
	return {
		getMovies,
		getMovie,
		getActor,
		getRecommendMovies,
		getMoviesWithActor,
		searchData,
		loading,
		error,
	};
}
