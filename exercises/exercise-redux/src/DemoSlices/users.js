const defaultState = ['Tom'];

export const ActionTypes = {
	ADD_USER: 'ADD_USER',
};
const { ADD_USER } = ActionTypes;

const reducer = (state = defaultState, action) => {
	const { type, payload: newUser } = action;

	switch (type) {
		case ADD_USER: {
			return [...state, newUser];
		}
	}
	return state;
};

export const getAllUsers = state => state.users;

export const getFilteredUsers = (state, keyword) =>
	keyword
		? state.users.filter(user =>
				(user || '').toLowerCase().includes((keyword || '').toLowerCase())
		  )
		: state.users;

export const addUser = user => ({ type: ADD_USER, payload: user });

export default reducer;
