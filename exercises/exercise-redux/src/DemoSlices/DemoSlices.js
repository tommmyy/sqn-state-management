// create fork of the file
// show ui, users
// combineReducers
//
// connect with useDispatch, useSelector
import React, { useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Box, Button, Divider, Heading, Input, Label, Text } from 'theme-ui';

import ui from './ui';
import users from './users';

const rootReducer = combineReducers({
	ui,
	users,
});

const store = createStore(rootReducer);

const NavBar = () => {
	const isOpen = true;
	const closeNavbar = () => {};
	const openNavbar = () => {};

	return (
		<Box sx={{ background: 'muted' }}>
			<Heading>Navbar</Heading>
			<Box>
				I am{' '}
				<Text as="span" sx={{ fontWeight: 'bold' }}>
					{isOpen ? 'opened' : 'closed'}
				</Text>
				!
			</Box>

			<Button
				variant="outline"
				onClick={() => (isOpen ? closeNavbar() : openNavbar())}
			>
				Toggle navigation
			</Button>
		</Box>
	);
};
const addUser = () => {};

const Users = () => {
	const [newUser, setNewUser] = useState('');
	const users = ['Tom'];

	return (
		<Box>
			<Heading>Users</Heading>
			<Box as="ul">
				{users &&
					users.map(user => (
						<Box as="li" key={user}>
							{user}
						</Box>
					))}
			</Box>

			<Divider />

			<form
				onSubmit={event => {
					event.preventDefault();

					addUser(newUser);
					setNewUser('');
				}}
			>
				<Label htmlFor="new-user">New User</Label>
				<Input
					id="new-user"
					value={newUser}
					onChange={event => {
						setNewUser(event.target.value);
					}}
				/>
				<Button sx={{ my: 2 }}>Add</Button>
			</form>
		</Box>
	);
};

const App = () => (
	<Box>
		<NavBar />
		<Divider />
		<Users />
	</Box>
);

const Demo = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default Demo;
