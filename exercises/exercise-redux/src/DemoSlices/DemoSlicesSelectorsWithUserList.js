// Added memo(UserList)
// UserList is not rendered when adding new user
import React, { memo, useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, Heading, Input, Label, Text } from 'theme-ui';
import { createSelector } from 'reselect';

import ui, { closeNavbar, isNavbarOpen, openNavbar } from './ui';
import users, { addUser, getAllUsers, getFilteredUsers } from './users';

const getFilteredUsersMemo = createSelector(
	[getAllUsers, (_, keyword) => keyword],
	(users, keyword) => (
		console.log('computing users'),
		keyword
			? users.filter(user =>
					(user || '').toLowerCase().includes((keyword || '').toLowerCase())
			  )
			: users
	)
);

const rootReducer = combineReducers({
	ui,
	users,
});

const store = createStore(rootReducer);

const NavBar = () => {
	const isOpen = useSelector(isNavbarOpen);
	const dispatch = useDispatch();

	console.log('render navbar');

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
				onClick={() => dispatch(isOpen ? closeNavbar() : openNavbar())}
			>
				Toggle navigation
			</Button>
		</Box>
	);
};

const UserList = memo(
	({ users }) => (
		console.log('render UserList'),
		(
			<Box as="ul">
				{users &&
					users.map(user => (
						<Box as="li" key={user}>
							{user}
						</Box>
					))}
			</Box>
		)
	)
);
UserList.displayName = 'UserList';

const Users = () => {
	const [newUser, setNewUser] = useState('');
	const [filter, setFilter] = useState('');

	const users = useSelector(state => getFilteredUsersMemo(state, filter));
	// const users = useSelector(state => getFilteredUsers(state, filter));
	const dispatch = useDispatch();

	console.log('render Users');

	return (
		<Box>
			<Heading sx={{ mb: 2 }}>Users</Heading>

			<Input
				value={filter}
				placeholder="Filter..."
				onChange={event => {
					setFilter(event.target.value);
				}}
				sx={{ mb: 2 }}
			/>
			<UserList users={users} />

			<Divider />

			<form
				onSubmit={event => {
					event.preventDefault();
					if (newUser) {
						dispatch(addUser(newUser));

						setNewUser('');
					}
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
