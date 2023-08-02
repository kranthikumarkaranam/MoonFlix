import styled from 'styled-components';

const RatingContainer = styled.div`
	position: relative;
	color: rgba(0, 0, 0, 0.26);
	font-size: 28px;
	line-height: 28px;
	&::after {
		position: absolute;
		content: '★★★★★';
		left: 0;
		${(props) => {
			const rate = +props.rate * 10 + '%';
			return `background: linear-gradient(90deg, rgb(250, 175, 0) ${rate}, transparent ${rate})`;
		}};
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`;

export default function Rating(props) {
	return <RatingContainer {...props}>☆☆☆☆☆</RatingContainer>;
}
