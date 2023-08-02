import { useCallback, useState } from 'react';

export default function useHttp() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const request = useCallback(async (url) => {
		setLoading(true);
		setError(false);

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.success === false) {
				throw new Error(JSON.stringify(data));
			}

			return data;
		} catch (e) {
			const error = JSON.parse(e.message);
			console.error(error.status_message);
			setError(error.status_code);
		} finally {
			setLoading(false);
		}
	}, []);

	return { request, loading, error };
}
