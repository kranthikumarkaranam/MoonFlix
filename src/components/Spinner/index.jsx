import styled from 'styled-components';
import img from '../../assets/spinner.svg';

export const SpinnerContainer = styled.span`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export default function Spinner() {
	return (
		<SpinnerContainer>
			<img
				src={img}
				alt='Spinner'
			/>
		</SpinnerContainer>
	);
}
