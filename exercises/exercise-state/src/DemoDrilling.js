import React, { useState } from 'react';
import { Box, Button, Flex } from 'theme-ui';

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

const CookieController = ({ onAddCookie }) => (
	<Button onClick={() => onAddCookie()}>Gimme Cookie!</Button>
);

const CookieJar = ({ cookies }) => (
	<Flex sx={{ flexWrap: 'wrap', lineHeight: 1 }}>
		{Array(cookies)
			.fill()
			.map((_, i) => (
				<Cookie key={i} />
			))}
	</Flex>
);

const Demo = () => {
	const [cookies, setCookies] = useState(0);

	return (
		<Flex
			sx={{ flexDirection: 'column', gap: 'size-100', alignItems: 'center' }}
		>
			<CookieController
				onAddCookie={() => {
					setCookies(cookies + 1);
				}}
			/>
			<CookieJar cookies={cookies} />
		</Flex>
	);
};
export default Demo;
