import React, { createContext, useContext, useState } from 'react';
import { Box, Button, Flex } from 'theme-ui';

const CookiesContext = createContext();
const CookiesSetContext = createContext();

const CookiesProvider = props => {
	const [cookies, setCookies] = useState(0);

	const api = { cookies, setCookies };

	return (
		<CookiesContext.Provider value={cookies} {...props}>
			<CookiesSetContext.Provider value={setCookies} {...props} />
		</CookiesContext.Provider>
	);
};

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

const useCookies = () => useContext(CookiesContext);
const useCookiesSet = () => useContext(CookiesSetContext);

const CookieController = () => {
	console.log('render Controller');
	const setCookies = useCookiesSet();

	return (
		<Button onClick={() => setCookies(currentState => currentState + 1)}>
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
