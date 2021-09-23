const defaultState = { navbarOpen: false };

export const ActionTypes = {
	OPEN: 'OPEN',
	CLOSE: 'CLOSE',
};
const { OPEN, CLOSE } = ActionTypes;

const reducer = (state = defaultState, action) => {
	const { type } = action;
	switch (type) {
		case OPEN: {
			return { navbarOpen: true };
		}
		case CLOSE: {
			return { navbarOpen: false };
		}
	}
	return state;
};

export const isNavbarOpen = state => (
	console.log('called isNavbarOpen'), state.ui.navbarOpen
);

export const openNavbar = () => ({ type: OPEN });
export const closeNavbar = () => ({ type: CLOSE });

export default reducer;
