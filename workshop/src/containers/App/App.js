import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container } from '@workshop/ui-components';

import { Layout } from '../../components';
import * as types from '../../types';

import logo from './logo.svg';

import './App.css';

const App = ({ pages }) => (
	<Layout>
		<Container className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Welcome to React Workshop</p>
				<ul className="App-menu">
					{pages
						.filter(({ slug }) => slug.match(/exercise/))
						.sort()
						.map(({ slug }) => (
							<li key={slug}>
								<Link className="App-link" to={slug}>
									{slug}
								</Link>
							</li>
						))}
				</ul>
			</header>
		</Container>
	</Layout>
);

App.propTypes = {
	pages: PropTypes.arrayOf(types.Page),
};

export default App;
