// RecoilRoot, useRecoilState
// useRecoilValue, useSetRecoilState
// show how renders improved
import React from 'react';
import { Box, Button, Flex } from 'theme-ui';
import {
	RecoilRoot,
	atom,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

const cookiesState = atom({ key: 'cookies', default: 0 });

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
	console.log('controller');
	const [cookies, setCookies] = useRecoilState(cookiesState);
	// const setCookies = useSetRecoilState(cookiesState);

	// return <Button onClick={() => setCookies(x => x + 1)}>Gimme Cookie!</Button>;
	return <Button onClick={() => setCookies(cookies + 1)}>Gimme Cookie!</Button>;
};

const CookieJar = () => {
	const [cookies] = useRecoilState(cookiesState);
	// const cookies = useRecoilValue(cookiesState);

	console.log('jar');
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
