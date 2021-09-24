import React from 'react';
import { Box, Button, Flex } from 'theme-ui';
import { RecoilRoot } from 'recoil';

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
	const setCookies = () => {};

	return <Button onClick={() => setCookies()}>Gimme Cookie!</Button>;
};

const CookieJar = () => {
	const cookies = 3;

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
	<RecoilRoot>
		<Flex
			sx={{ flexDirection: 'column', gap: 'size-100', alignItems: 'center' }}
		>
			<CookieController />

			<CookieJar />
		</Flex>
	</RecoilRoot>
);
export default Demo;
