// Import required library
import styled from 'styled-components';

// Styled component to create a container for the star rating display
const RatingContainer = styled.div`
	position: relative;
	color: rgba(0, 0, 0, 0.26); // Set default color for empty stars
	font-size: 28px; // Set font size for the stars
	line-height: 28px; // Set line height for proper alignment

	&::after {
		position: absolute;
		content: '★★★★★'; // Display full stars as content
		left: 0; // Position the stars to the left

		${(props) => {
			// Dynamic styling using props.rate to set gradient color for stars
			const rate = +props.rate * 10 + '%'; // Calculate percentage based on the rate prop
			return `background: linear-gradient(90deg, rgb(250, 175, 0) ${rate}, transparent ${rate})`;
		}};

		-webkit-background-clip: text; // Use the text as a mask for the gradient
		-webkit-text-fill-color: transparent; // Make the text invisible, keeping the gradient visible
	}
`;

// Rating component
export default function Rating(props) {
	return <RatingContainer {...props}>☆☆☆☆☆</RatingContainer>;
}
