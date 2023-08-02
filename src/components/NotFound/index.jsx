import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	h1 {
		font-size: 3em;
	}
	a {
		display flex;
		justify-content: center;
		align-items: center;
		span {
			font-size: 2.5em;
			line-height: 1;
			margin-right: 5px;
			text-decoration: none;
			transition: transform 0.5s;
		}
		&:hover {
			& span {
				transform: translateX(-5px); 
			}
			& p {
				text-decoration: underline;
			}
		}
		p {
			font-size: 1.2em;
			font-weight: bold;
		}
	}
`;

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Container>
			<h1>Page Not Found</h1>
			<a onClick={() => navigate(-1)}>
				<span>🠐</span> <p>Go back</p>
			</a>
		</Container>
	);
}
