import useHttp from './UseHttp';

export default function useAPI() {
	const API = 'https://api.themoviedb.org/3/';
	const APIKEY = `api_key=${process.env.REACT_APP_TMDB_KEY}`;

	const { request, loading, error } = useHttp();

	const getMovies = async (category = null, genre = null, page = 1) => {
		let url = '';

		if (genre) {
			url = `${API}discover/movie?${APIKEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genre}`;
		} else {
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
		return await request(url);
	};

	const getMovie = async (id) => {
		return await request(
			`${API}movie/${id}?${APIKEY}&language=en-US&append_to_response=videos,assets,credits`
		);
	};

	const getRecommendMovies = async (id, page = 1) => {
		return await request(
			`${API}movie/${id}/recommendations?${APIKEY}&language=en-US&page=${page}`
		);
	};

	const getActor = async (id) => {
		return await request(`${API}person/${id}?${APIKEY}`);
	};

	const searchData = async (value) => {
		return await request(`${API}search/multi?${APIKEY}&query=${value}&page=1`);
	};

	const getMoviesWithActor = async (id, page = 1) => {
		return await request(
			`${API}discover/movie?${APIKEY}&with_cast=${id}&page=${page}`
		);
	};

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
