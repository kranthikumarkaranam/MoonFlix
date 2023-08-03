// Importing necessary hooks from React
import { useCallback, useState } from 'react';

// Custom hook useHttp for handling HTTP requests
export default function useHttp() {
	// State variables to manage loading and error states
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Function to make an HTTP request to the given URL
	const request = useCallback(async (url) => {
		// Set loading to true at the beginning of the request
		setLoading(true);
		// Reset error state before making the request
		setError(false);

		try {
			// Sending an HTTP request using fetch API
			const response = await fetch(url);
			// Parsing the response data as JSON
			const data = await response.json();

			// If the API response indicates an error, throw an error with the response data
			if (data.success === false) {
				throw new Error(JSON.stringify(data));
			}

			// Return the data received from the API
			return data;
		} catch (e) {
			// If an error occurs during the request or parsing the response, handle it here
			const error = JSON.parse(e.message);
			console.error(error.status_message);
			// Set the error state with the status code received from the API response
			setError(error.status_code);
		} finally {
			// Set loading to false after the request is completed, regardless of success or failure
			setLoading(false);
		}
	}, []);

	// Exposing the necessary function and state variables to the components using this hook
	return { request, loading, error };
}
