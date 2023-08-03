// Importing necessary modules and components from React and other libraries
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import AOS from 'aos';
import Nav from '../Nav';
import Header from '../Header';
import Spinner from '../Spinner';

// Importing CSS styles for animation and resetting default styles
import 'aos/dist/aos.css';
import '../../reset.scss';

// Lazy loading components for better performance
const MovieList = lazy(() => import('../MovieList'));
const Movie = lazy(() => import('../Movie'));
const Actor = lazy(() => import('../Actor'));
const NotFound = lazy(() => import('../NotFound'));

// Styled component for the main app container
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

// The main App component
export default function App() {
	// Initialize AOS library for animations once the component mounts
	useEffect(() => {
		AOS.init({
			once: true,
		});
	}, []);

	// Render the app layout with routes and components
	return (
		<Router>
			<AppContainer className='app'>
				{/* Navigation bar component */}
				<Nav className='nav' />
				<div className='stage'>
					{/* Header component */}
					<Header />
					<main>
						{/* Suspense component with fallback spinner for lazy-loaded components */}
						<Suspense fallback={<Spinner />}>
							<Routes>
								{/* Route for the default home page showing popular movies */}
								<Route
									path='/'
									element={<MovieList category='popular' />}
								/>
								{/* Route for the top-rated movies page */}
								<Route
									path='/top-rated'
									element={<MovieList category='top-rated' />}
								/>
								{/* Route for the upcoming movies page */}
								<Route
									path='/upcoming'
									element={<MovieList category='upcoming' />}
								/>

								{/* Route for displaying movies based on a specific genre */}
								<Route
									path='/genre/:genre'
									element={<MovieList />}
								/>
								{/* Route for displaying detailed information about a movie */}
								<Route
									path='/movie/:id'
									element={<Movie />}
								/>
								{/* Route for displaying detailed information about an actor */}
								<Route
									path='/actor/:id'
									element={<Actor />}
								/>
								{/* Route for handling any other invalid URLs */}
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
