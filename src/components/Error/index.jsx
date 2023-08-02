import styled from 'styled-components';
import NotFound from '../NotFound';
import img from '../../assets/error.svg';

const ErrorContainer = styled.span`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 300px;
	transform: translate(-50%, -50%);
`;

export default function Error({ code }) {
	switch (code) {
		case 34:
			return <NotFound />;

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
