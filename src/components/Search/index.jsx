// Import required libraries and components
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAPI from '../../services/UseAPI'; // Custom hook for search API
import Spinner from '../Spinner'; // Loading spinner component
import imgNotFound from '../../assets/no-image.svg'; // Default image for not found images

// Styled component to create a container for the search bar and dropdown list
const SearchContainer = styled.div`
	position: relative;
	label {
		display: flex;
		position: relative;
		padding: 5px 0;
		cursor: text;
		&:hover .line {
			height: 2px;
			background-color: white;
		}
	}
	svg {
		fill: rgba(255, 255, 255, 0.54);
	}
	input {
		color: white;
		margin-left: 5px;
		&:focus ~ .line {
			background-color: #c9c9c9;
			height: 2px;
		}
	}
	.line {
		position: absolute;
		height: 1px;
		width: 100%;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.54);
		transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	}
	.list {
		position: absolute;
		margin-top: 20px;
		width: 300px;
		min-height: 150px;
		max-height: 500px;
		right: 0;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.12);
		overflow-y: auto;
		li {
			& + li {
				border-top: 1px solid rgba(0, 0, 0, 0.12);
			}
			a {
				display: flex;
				align-items: center;
				padding: 10px;
				transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
				&:hover {
					background-color: rgba(0, 0, 0, 0.06);
				}
				img {
					flex: 0 0 auto;
					width: 60px;
					height: 80px;
					border-radius: 10px;
					object-fit: cover;
					margin-right: 10px;
				}
			}
		}
		.no-results {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: rgba(0, 0, 0, 0.6);
		}
	}
`;

// Search component
export default function Search() {
	const [search, setSearch] = useState(''); // State to hold the search input value
	const [showList, setShowList] = useState(false); // State to control the visibility of the dropdown list
	const [data, setData] = useState([]); // State to store the search results
	const { searchData, loading, error } = useAPI(); // Custom hook for handling search API

	// Function to fetch search results based on the input value
	const fetchData = async (value) => {
		const res = await searchData(value);
		setData(res.results); // Update the data state with the search results
	};

	useEffect(() => {
		// When the search input value changes, fetch data and show the dropdown list if the search value is not empty
		if (search.length) {
			fetchData(search);
			setShowList(true);
		} else {
			setShowList(false); // Hide the dropdown list if the search value is empty
		}
	}, [search]);

	return (
		// SearchContainer is the main container for the search bar and the dropdown list
		<SearchContainer onBlur={(e) => !e.relatedTarget && setShowList(false)}>
			{/* Label with the search icon and input field */}
			<label>
				<svg viewBox='0 0 24 24'>
					{/* SVG path for the search icon */}
					{/* ... (SVG path for the search icon) */}
				</svg>
				<input
					onFocus={() => search.length && setShowList(true)}
					onChange={(e) => setSearch(e.target.value)}
					type='text'
					value={search}
				/>
				<span className='line'></span>
			</label>

			{/* Dropdown list to display search results */}
			{showList ? (
				<ul className='list'>
					{/* Show a loading spinner if the search results are still loading */}
					{loading ? (
						<Spinner />
					) : data.length ? (
						// Map through the search results and display them as list items
						data.map((el) => {
							switch (el.media_type) {
								case 'movie':
									// For movies, display a list item with a link to the movie page and movie poster
									return (
										<li key={el.id}>
											<a href={`/movie/${el.id}`}>
												<img
													src={
														el.poster_path
															? `https://image.tmdb.org/t/p/w154${el.poster_path}`
															: imgNotFound
													}
													style={
														!el.poster_path ? { objectFit: 'contain' } : null
													}
												/>
												<p>{el.title}</p>
											</a>
										</li>
									);

								case 'person':
									// For persons (actors), display a list item with a link to the actor page and actor's profile picture
									return (
										<li key={el.id}>
											<a href={`/actor/${el.id}`}>
												<img
													src={
														el.profile_path
															? `https://image.tmdb.org/t/p/w154${el.profile_path}`
															: imgNotFound
													}
													style={
														!el.profile_path ? { objectFit: 'contain' } : null
													}
												/>
												<p>{el.name}</p>
											</a>
										</li>
									);
							}
						})
					) : (
						// If no search results found, display a message
						<p className='no-results'>No results</p>
					)}
				</ul>
			) : null}
		</SearchContainer>
	);
}
