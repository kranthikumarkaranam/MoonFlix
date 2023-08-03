// Import required libraries and assets
import styled from 'styled-components';
import img from '../../assets/spinner.svg'; // Import the spinner image

// Styled component to create a container for the spinner
export const SpinnerContainer = styled.span`
	position: absolute;
	left: 50%; // Center the spinner horizontally
	top: 50%; // Center the spinner vertically
	transform: translate(-50%, -50%); // Move the spinner to the exact center
`;

// Spinner component
export default function Spinner() {
	return (
		// The SpinnerContainer is the container for the spinner
		<SpinnerContainer>
			{/* The spinner image */}
			<img
				src={img}
				alt='Spinner'
			/>
		</SpinnerContainer>
	);
}
