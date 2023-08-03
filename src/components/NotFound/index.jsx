// Import required libraries
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled component to create a container for the "Page Not Found" message and link
const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;

	h1 {
		font-size: 3em; // Set font size for the heading
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			font-size: 2.5em; // Set font size for the arrow icon
			line-height: 1; // Set line height to adjust vertical alignment
			margin-right: 5px; // Add some space between the icon and the text
			text-decoration: none; // Remove underline from the link
			transition: transform 0.5s; // Add a smooth transition effect to the icon on hover
		}

		&:hover {
			span {
				transform: translateX(
					-5px
				); // Move the icon slightly to the left on hover
			}

			p {
				text-decoration: underline; // Underline the link text on hover
			}
		}

		p {
			font-size: 1.2em; // Set font size for the link text
			font-weight: bold; // Add bold font weight to the link text
		}
	}
`;

// NotFound component
export default function NotFound() {
	const navigate = useNavigate(); // Get the navigate function from react-router-dom

	return (
		<Container>
			<h1>Page Not Found</h1>
			<a onClick={() => navigate(-1)}>
				{/* Go back link with onClick event */}
				<span>🠐</span> {/* Arrow icon */}
				<p>Go back</p> {/* Link text */}
			</a>
		</Container>
	);
}
