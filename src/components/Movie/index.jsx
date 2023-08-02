import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAPI from '../../services/UseAPI';
import Spinner from '../../elements/Spinner';
import Error from '../../elements/Error';
import Rating from '../../elements/Rating';
import MovieCard from '../../elements/MovieCard';
import { genres as genreList } from '../Nav';

import person from '../../assets/no-person.svg';
import imgNotFound from '../../assets/no-image.svg';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';

const MovieContainer = styled.div`
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
		h2 {
			font-size: 1.3rem;
			line-height: 1.334;
		}
		.title {
			text-align: center;
			margin: 0px 0px 0.65em;
		}
		.title {
			font-size: 2.5rem;
			line-height: 1.167;
		}
		.statistic,
		.genres {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			gap: 10px 0;
		}
		.statistic {
			display: flex;
			.rating {
				display: flex;
				align-items: center;
				span {
					margin-left: 10px;
				}
			}
			.additional {
				font-weight: 500;
				font-size: 1.1rem;
				line-height: 1.5;
				letter-spacing: 0.0075em;
			}
		}
		.genres {
			margin-top: 35px;
			.genre {
				display: flex;
				align-items: center;
				img {
					height: 30px;
					width: 30px;
					margin-right: 12px;
				}
			}
		}
		.overview {
			margin-top: 25px;
			h2 {
				margin-bottom: 10px;
			}
		}
		.cast {
			margin-top: 25px;
			h2 {
				margin-bottom: 10px;
			}
			.actors {
				display: flex;
				justify-content: space-between;
				gap: 16px;
				flex-wrap: wrap;
				.actor {
					flex: 0 0 110px;
					img {
						height: 128px;
						width: 100%;
						object-fit: cover;
						border-radius: 10px;
						margin-bottom: 5px;
					}
					p {
						line-height: 1.5;
					}
					.film-name {
						color: rgba(0, 0, 0, 0.6);
					}
				}
			}
		}
		.links {
			display: flex;
			justify-content: space-between;
			margin-top: 20px;
			.group {
				display: flex;
			}
			.group:nth-child(1) {
				a {
					&:nth-child(1) {
						border-radius: 4px 0 0 4px;
					}
					&:nth-child(2) {
						border-radius: 0;
					}
					&:nth-child(3) {
						border-radius: 0 4px 4px 0;
					}
				}
			}
			a {
				display: flex;
				align-items: center;
				text-transform: uppercase;
				color: rgb(25, 118, 210);
				line-height: 1.75;
				font-size: 0.875rem;
				font-weight: 500;
				padding: 5px 15px;
				border: 1px solid rgba(25, 118, 210, 0.5);
				border-radius: 4px;
				transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
					border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
				&:hover {
					border: 1px solid rgba(25, 118, 210);
					background: rgba(25, 118, 210, 0.04);
				}
				& + a {
					margin-left: -1px;
				}
				svg {
					width: 20px;
					height: 20px;
					margin-left: 5px;
					fill: rgb(25, 118, 210);
				}
			}
		}
	}
	.similar {
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
	}
`;

const StyledModal = Modal.styled`
	width: 560;
	height: 315;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	opacity: ${(props) => props.opacity};
	transition : all 0.3s ease-in-out;
`;

const FadingBackground = styled(BaseModalBackground)`
	opacity: ${(props) => props.opacity};
	transition: all 0.3s ease-in-out;
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

export default function Movie() {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [recommendMovies, setRecommendMovies] = useState({});
	const {
		getRecommendMovies,
		loading: loadingRecommend,
		error: errorRecommend,
	} = useAPI();
	const { getMovie, loading: loadingMovie, error: errorMovie } = useAPI();

	const fetchData = async () => {
		const res = await getMovie(id);
		const res1 = await getRecommendMovies(id);

		setData(res);
		setRecommendMovies(res1);
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<>
			{loadingMovie ? (
				<Spinner />
			) : errorMovie ? (
				<Error code={errorMovie} />
			) : (
				<View
					data={data}
					recommendMovies={recommendMovies}
					loadingRecommend={loadingRecommend}
					errorRecommend={errorRecommend}
				/>
			)}
		</>
	);
}

const View = ({
	data = {},
	recommendMovies,
	loadingRecommend,
	errorRecommend,
}) => {
	const {
		poster_path,
		title,
		tagline,
		vote_average,
		runtime,
		spoken_languages,
		overview,
		homepage,
		imdb_id,
		credits,
		videos,
		release_date,
		genres,
	} = data;

	console.log(data);

	const date = new Date(release_date),
		day = date.getDate(),
		month = months[date.getMonth()],
		year = date.getFullYear();

	const [isOpen, setIsOpen] = useState(false);
	const [opacity, setOpacity] = useState(0);

	function toggleModal() {
		event.preventDefault();
		setOpacity(0);
		setIsOpen(!isOpen);
	}

	function afterOpen() {
		setTimeout(() => {
			setOpacity(1);
		}, 100);
	}

	function beforeClose() {
		return new Promise((resolve) => {
			setOpacity(0);
			setTimeout(resolve, 300);
		});
	}

	return (
		<MovieContainer>
			<div className='thumbnail'>
				<img
					src={
						poster_path
							? `https://image.tmdb.org/t/p/w500/${poster_path}`
							: imgNotFound
					}
					alt={title}
				/>
			</div>
			<div className='description'>
				<h1 className='title'>{`${title} (${year})`}</h1>

				<div className='statistic'>
					<div className='rating'>
						<Rating rate={vote_average}>☆☆☆☆☆</Rating>
						<span>{vote_average} / 10</span>
					</div>
					<p className='additional'>
						{runtime}min | {month}-{day}-{year}
						{spoken_languages && spoken_languages[0]
							? ` | ${spoken_languages[0].name}`
							: null}
					</p>
				</div>

				<div className='genres'>
					{genres &&
						genres.map(({ id }) => {
							const genre = genreList.filter((el) => el.id == id)[0];

							return (
								<Link
									to={genre.url}
									key={id}
								>
									<div className='genre'>
										<img
											src={genre.icon}
											alt={genre.label}
										/>
										{genre.label}
									</div>
								</Link>
							);
						})}
				</div>

				<div className='overview'>
					<h2>Overview</h2>
					<p>{overview}</p>
				</div>

				<div className='cast'>
					<h2>Top Cast</h2>
					<div className='actors'>
						{credits &&
							credits.cast
								.slice(0, 6)
								.map(({ id, name, character, profile_path }) => (
									<a
										href={`/actor/${id}`}
										key={id}
										className='actor'
									>
										<img
											src={
												profile_path
													? `https://image.tmdb.org/t/p/w500/${profile_path}`
													: person
											}
											alt={name}
										/>
										<p className='real-name'>{name}</p>
										<p className='film-name'>{character}</p>
									</a>
								))}
					</div>
				</div>

				<div className='links'>
					<div className='group'>
						<a
							href={homepage}
							target='_blank'
							rel='noopener noreferrer'
						>
							Website
							<svg viewBox='0 0 24 24'>
								<path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z'></path>
							</svg>
						</a>

						<a
							href={`https://www.imdb.com/title/${imdb_id}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							IMDB
							<svg viewBox='0 0 24 24'>
								<path d='m18 4 2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z'></path>
							</svg>
						</a>

						<a
							href='#'
							onClick={toggleModal}
						>
							Trailer
							<svg viewBox='0 0 24 24'>
								<path d='M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z'></path>
							</svg>
						</a>
					</div>
				</div>
			</div>

			{Object.keys(recommendMovies).length && recommendMovies.results.length ? (
				<div className='similar'>
					<h1>You might also like</h1>

					<div className='list'>
						{loadingRecommend ? (
							<Spinner />
						) : errorRecommend ? (
							<Error code={errorRecommend} />
						) : (
							recommendMovies.results.slice(0, 8).map((data) => (
								<MovieCard
									key={data.id}
									{...data}
								/>
							))
						)}
					</div>
				</div>
			) : null}

			<ModalProvider backgroundComponent={FadingBackground}>
				<StyledModal
					isOpen={isOpen}
					afterOpen={afterOpen}
					beforeClose={beforeClose}
					onBackgroundClick={toggleModal}
					onEscapeKeydown={toggleModal}
					opacity={opacity}
					backgroundProps={{ opacity }}
				>
					{videos?.results?.length > 0 && (
						<iframe
							width='560'
							height='315'
							src={`https://www.youtube.com/embed/${videos.results[0].key}`}
							title='Trailer'
							frameborder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowfullscreen
						></iframe>
					)}
				</StyledModal>
			</ModalProvider>
		</MovieContainer>
	);
};
