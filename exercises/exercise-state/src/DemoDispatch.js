// useReducer
// separate context for dispatch and for value
import React, { createContext, useContext, useReducer } from 'react';
import { Box, Button, Flex } from 'theme-ui';

const CookiesContext = createContext();
const CookiesDispatchContext = createContext();
const ActionTypes = { ADD_COOKIE: 'ADD_COOKIE' };

const { ADD_COOKIE } = ActionTypes;

const cookiesReducer = (state, action) => {
	if (action.type === ADD_COOKIE) {
		return state + 1;
	}
	return state;
};
const addCookie = () => ({ type: ADD_COOKIE });

const CookiesProvider = props => {
	const [cookies, dispatch] = useReducer(cookiesReducer, 0);

	return (
		<CookiesDispatchContext.Provider value={dispatch}>
			<CookiesContext.Provider value={cookies} {...props} />
		</CookiesDispatchContext.Provider>
	);
};

const useCookies = () => useContext(CookiesContext);
const useCookiesDispatch = () => useContext(CookiesDispatchContext);

const Cookie = ({ sx, ...rest }) => (
	<Box
		ass="span"
		sx={{
			fontSize: 'min(12vw, 100px)',
			...sx,
		}}
		{...rest}
	>
		🍪
	</Box>
);

const CookieController = () => {
	const dispatch = useCookiesDispatch();

	console.log('unwanted render');

	return (
		<Button onClick={() => dispatch({ type: ADD_COOKIE })}>
			Gimme Cookie!
		</Button>
	);
};

const CookieJar = () => {
	const cookies = useCookies();

	return (
		<Flex sx={{ flexWrap: 'wrap', lineHeight: 1 }}>
			{Array(cookies)
				.fill()
				.map((_, i) => (
					<Cookie key={i} />
				))}
		</Flex>
	);
};

const Demo = () => (
	<CookiesProvider>
		<Flex
			sx={{ flexDirection: 'column', gap: 'size-100', alignItems: 'center' }}
		>
			<CookieController />

			<CookieJar />
		</Flex>
	</CookiesProvider>
);
export default Demo;
