import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import AOS from 'aos';
import Nav from '../Nav';
import Header from '../Header';
import Spinner from '../../elements/Spinner';

import 'aos/dist/aos.css';
import '../../reset.scss';

const MovieList = lazy(() => import('../MovieList'));
const Movie = lazy(() => import('../Movie'));
const Actor = lazy(() => import('../Actor'));
const NotFound = lazy(() => import('../NotFound'));

const AppContainer = styled.div`
	display: flex;
	.stage {
		position: relative;
		flex: 1 1 auto;
	}
	main {
		padding: 30px;
	}
`;

export default function App() {
	useEffect(() => {
		AOS.init({
			once: true,
		});
	}, []);

	return (
		<Router>
			<AppContainer className='app'>
				<Nav className='nav' />
				<div className='stage'>
					<Header />
					<main>
						<Suspense fallback={<Spinner />}>
							<Routes>
								<Route
									path='/'
									element={<MovieList category='popular' />}
								/>
								<Route
									path='/top-rated'
									element={<MovieList category='top-rated' />}
								/>
								<Route
									path='/upcoming'
									element={<MovieList category='upcoming' />}
								/>

								<Route
									path='/genre/:genre'
									element={<MovieList />}
								/>
								<Route
									path='/movie/:id'
									element={<Movie />}
								/>
								<Route
									path='/actor/:id'
									element={<Actor />}
								/>
								<Route
									path='*'
									element={<NotFound />}
								/>
							</Routes>
						</Suspense>
					</main>
				</div>
			</AppContainer>
		</Router>
	);
}
