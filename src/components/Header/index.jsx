// Importing styled-components and the Search component
import styled from 'styled-components';
import Search from '../Search';

// Styled component for the header container
const HeaderContainer = styled.header`
	position: sticky;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: rgb(25, 118, 210);
	padding: 0 30px;
	height: 80px;
	box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
		rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
	z-index: 1;
	svg {
		width: 25px;
		height: 25px;
	}
`;

// Header component to render the header of the application
export default function Header() {
	return (
		<HeaderContainer>
			{/* Rendering the Search component */}
			<Search />
		</HeaderContainer>
	);
}
