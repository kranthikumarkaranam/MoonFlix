import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import useAPI from '../../services/UseAPI';
import Spinner from '../../elements/Spinner';
import Error from '../../elements/Error';
import MovieCard from '../../elements/MovieCard';

const ListContainer = styled.div`
	.big-card {
		display: flex;
		height: 490px;
		padding: 30px;
		color: white;
		background-position: center;
		background-size: cover;
		background-color: rgba(0, 0, 0, 0.575);
		background-blend-mode: darken;
		border-radius: 4px;
		.description {
			margin-top: auto;
			max-width: 50%;
			h2 {
				font-size: 2.7rem;
				line-height: 1.334;
			}
			p {
				margin-top: 30px;
				font-size: 0.92rem;
				line-height: 1.73;
			}
		}
	}
	.list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		grid-gap: 30px;
		margin-top: 30px;
	}
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		button {
			background-color: rgb(25, 118, 210);
			padding: 6px 16px;
			font-weight: 500;
			font-size: 0.875rem;
			line-height: 1.75;
			color: white;
			border-radius: 4px;
			text-transform: uppercase;
			box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
				rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
			transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			&:hover {
				background-color: rgb(21, 101, 192);
				box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
					rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
			}
			&:disabled {
				opacity: 0.7;
				pointer-events: none;
			}
		}
		span {
			font-size: 2.125rem;
			line-height: 1.235;
			color: rgba(0, 0, 0, 0.87);
			margin: 0 20px;
		}
	}
`;

export default function MovieList({ category }) {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(null);
	const { genre } = useParams();
	const { getMovies, loading, error } = useAPI();

	const fetchData = async () => {
		const res = await getMovies(category, genre, page);
		setData(res);
	};

	useEffect(() => {
		fetchData();
	}, [page, genre, category]);

	useEffect(() => {
		setPage(1);
	}, [genre, category]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<Error />
			) : (
				<ListContainer>
					{data.results
						.slice(0, 1)
						.map(({ id, title, overview, backdrop_path }) => (
							<Link
								to={`/movie/${id}`}
								key={id}
							>
								<div
									className='big-card'
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
									}}
								>
									<div className='description'>
										<h2>{title}</h2>
										<p>{overview}</p>
									</div>
								</div>
							</Link>
						))}

					<div className='list'>
						{data.results.slice(1, 19).map((data) => (
							<MovieCard
								key={data.id}
								{...data}
							/>
						))}
					</div>

					<div className='pagination'>
						<button
							disabled={page === 1}
							onClick={() => setPage((page) => (page > 1 ? page - 1 : page))}
						>
							prev
						</button>
						<span>{page}</span>
						<button
							disabled={page === data.total_pages}
							onClick={() =>
								setPage((page) => (page < data.total_pages ? page + 1 : page))
							}
						>
							next
						</button>
					</div>
				</ListContainer>
			)}
		</>
	);
}
