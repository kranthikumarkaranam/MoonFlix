import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useAPI from '../../services/UseAPI';
import Spinner from '../Spinner';
import Error from '../Error';
import person from '../../assets/no-person.svg';
import MovieCard from '../MovieCard';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 50px;
	.thumbnail {
		flex: 0 0 33.33%;
		img {
			box-shadow: 0.5em 1em 1em rgb(64 64 70);
			border-radius: 20px;
			max-height: 550px;
			height: 100%;
			margin: 0 auto;
		}
	}
	.description {
		flex: 0 0 calc(66.66% - 50px);
		.title {
			font-size: 2.75rem;
			line-height: 1.2;
			font-weight: 300;
			margin: 0px 0px 0.35em;
		}
		.born {
			font-size: 1.34rem;
			line-height: 1.334;
			margin: 0px 0px 0.35em;
		}
	}
	.links {
		display: flex;
		margin-top: 20px;
		a {
			display: flex;
			align-items: center;
			text-transform: uppercase;
			color: white;
			line-height: 1.75;
			font-size: 0.875rem;
			font-weight: 500;
			padding: 5px 15px;
			border-radius: 4px;
			background-color: rgba(25, 118, 210);
			transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
			&:hover {
				background-color: rgb(21, 101, 192);
				box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
					rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
			}
			& + a {
				margin-left: -1px;
			}
			svg {
				width: 20px;
				height: 20px;
				margin-left: 5px;
				fill: white;
			}
		}
	}
`;

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export default function Actor() {
	const { id } = useParams();
	const [data, setData] = useState({});
	const { getActor, loading, error } = useAPI();
	const { name, birthday, biography, profile_path, imdb_id } = data;

	const date = new Date(birthday),
		day = date.getDate(),
		month = months[date.getMonth()],
		year = date.getFullYear();

	const fetchData = async () => {
		setData(await getActor(id));
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<Error />
			) : (
				<Container>
					<div className='thumbnail'>
						<img
							src={
								profile_path
									? `https://image.tmdb.org/t/p/w500/${profile_path}`
									: person
							}
							alt={name}
						/>
					</div>
					<div className='description'>
						<h1 className='title'>{name}</h1>
						<p className='born'>
							Born: {month}-{day}-{year}
						</p>

						<p className='biography'>{biography}</p>

						<div className='links'>
							<a
								href={`https://www.imdb.com/name/${imdb_id}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								IMDB
								<svg viewBox='0 0 24 24'>
									<path d='m18 4 2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z'></path>
								</svg>
							</a>
						</div>
					</div>

					<Movies id={id} />
				</Container>
			)}
		</>
	);
}

const MoviesContainer = styled.div`
	flex: 1 1 100%;
	h1 {
		margin: 30px 0px 1em;
		font-size: 2.6rem;
		text-align: center;
		line-height: 1.167;
	}
	.list {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		grid-gap: 30px;
		min-height: 100px;
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

const Movies = ({ id }) => {
	const { getMoviesWithActor, loading, error } = useAPI();
	const [page, setPage] = useState(1);
	const [data, setData] = useState({});

	const fetchData = async () => {
		setData(await getMoviesWithActor(id, page));
	};

	useEffect(() => {
		fetchData();
	}, [id, page]);

	return (
		<MoviesContainer>
			<h1>Movies</h1>

			<div className='list'>
				{loading ? (
					<Spinner />
				) : error ? (
					<Error />
				) : (
					data.results.slice(0, 12).map((data) => (
						<MovieCard
							key={data.id}
							{...data}
						/>
					))
				)}
			</div>

			{data.total_pages != 1 ? (
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
			) : null}
		</MoviesContainer>
	);
};
