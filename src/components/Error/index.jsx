// Importing styled-components and NotFound component
import styled from 'styled-components';
import NotFound from '../NotFound';
// Importing the error image
import img from '../../assets/error.svg';

// Styled component for the error container
const ErrorContainer = styled.span`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 300px;
	transform: translate(-50%, -50%);
`;

// Error component to handle different error codes and display appropriate messages
export default function Error({ code }) {
	// Switch statement to determine the appropriate action based on the error code
	switch (code) {
		// If the error code is 34, display the NotFound component (Page Not Found)
		case 34:
			return <NotFound />;
		// For any other error code, display the default error image
		default:
			return (
				<ErrorContainer>
					<img
						src={img}
						alt='Error'
					/>
				</ErrorContainer>
			);
	}
}
