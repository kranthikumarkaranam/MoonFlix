import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAPI from '../../services/UseAPI';
import Spinner from '../../elements/Spinner';
import imgNotFound from '../../assets/no-image.svg';

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

export default function Search() {
	const [search, setSearch] = useState('');
	const [showList, setShowList] = useState(false);
	const [data, setData] = useState([]);
	const { searchData, loading, error } = useAPI();

	const fetchData = async (value) => {
		const res = await searchData(value);
		setData(res.results);
	};

	useEffect(() => {
		if (search.length) {
			fetchData(search);
			setShowList(true);
		} else {
			setShowList(false);
		}
	}, [search]);

	return (
		<SearchContainer onBlur={(e) => !e.relatedTarget && setShowList(false)}>
			<label>
				<svg viewBox='0 0 24 24'>
					<path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></path>
				</svg>
				<input
					onFocus={() => search.length && setShowList(true)}
					onChange={(e) => setSearch(e.target.value)}
					type='text'
					value={search}
				/>
				<span className='line'></span>
			</label>

			{showList ? (
				<ul className='list'>
					{loading ? (
						<Spinner />
					) : data.length ? (
						data.map((el) => {
							switch (el.media_type) {
								case 'movie':
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
						<p className='no-results'>No results</p>
					)}
				</ul>
			) : null}
		</SearchContainer>
	);
}
