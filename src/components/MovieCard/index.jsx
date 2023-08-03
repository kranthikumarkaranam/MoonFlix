import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Rating from '../Rating';
import imgNotFound from '../../assets/no-image.svg';

// Styling for the movie card container
const CardContainer = styled.div`
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;

		// Styling for the movie poster image
		img {
			height: 300px;
			border-radius: 20px;

			// Add a smooth scale effect on hover
			&:hover {
				transform: scale(1.05);
			}
		}

		// Styling for the movie title
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

// MovieCard component that displays a movie card with its details
export default function MovieCard({ id, title, poster_path, vote_average }) {
	return (
		<CardContainer>
			<Link to={`/movie/${id}`}>
				{/* Movie card content */}
				<div
					data-aos='zoom-in' // Animation effect on card display
					className='item'
				>
					{/* Movie poster image */}
					<img
						src={
							poster_path
								? `https://image.tmdb.org/t/p/w500/${poster_path}`
								: imgNotFound // Display a placeholder image if no poster is available
						}
						alt={title} // Alt attribute for accessibility
					/>

					{/* Movie title */}
					<h2 title={title}>{title}</h2>

					{/* Movie rating */}
					<Rating
						title={vote_average} // Title attribute for accessibility
						rate={vote_average}
					>
						☆☆☆☆☆
					</Rating>
				</div>
			</Link>
		</CardContainer>
	);
}
