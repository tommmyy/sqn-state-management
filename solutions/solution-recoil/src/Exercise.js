// no prop drilling
// Adding CookiesProvider, useCookies
// CookieController renders multiple times
// Will memo work?

import React, { createContext, useContext, useMemo, useState } from 'react';
import { Box, Button, Flex } from 'theme-ui';

const CookiesContext = createContext();

const CookiesProvider = props => {
	const [cookies, setCookies] = useState(0);

	const value = { cookies, setCookies };
	// const value = useMemo(() => ({ cookies, setCookies }), [cookies]);

	return <CookiesContext.Provider value={value} {...props} />;
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

const CookieController = () => {
	const { setCookies } = useCookies();

	console.log('unwanted render');

	return (
		<Button onClick={() => setCookies(cookies => cookies + 1)}>
			Gimme Cookie!
		</Button>
	);
};

const CookieJar = () => {
	const { cookies } = useCookies();

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
