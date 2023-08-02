import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Rating from '../Rating';
import imgNotFound from '../../assets/no-image.svg';

const CardContainer = styled.div`
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			height: 300px;
			border-radius: 20px;
			&:hover {
				transform: scale(1.05);
			}
		}
		h2 {
			max-width: 100%;
			text-align: center;
			font-size: 1.3rem;
			line-height: 1.334;
			margin-top: 10px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
`;

export default function MovieCard({ id, title, poster_path, vote_average }) {
	return (
		<CardContainer>
			<Link to={`/movie/${id}`}>
				<div
					data-aos='zoom-in'
					className='item'
				>
					<img
						src={
							poster_path
								? `https://image.tmdb.org/t/p/w500/${poster_path}`
								: imgNotFound
						}
						alt={title}
					/>
					<h2 title={title}>{title}</h2>
					<Rating
						title={vote_average}
						rate={vote_average}
					>
						☆☆☆☆☆
					</Rating>
				</div>
			</Link>
		</CardContainer>
	);
}
