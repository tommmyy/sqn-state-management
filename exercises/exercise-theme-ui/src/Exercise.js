import React from 'react';
import { Box, ThemeProvider } from 'theme-ui';
import { system } from '@theme-ui/presets';
import { mergeDeepRight } from 'ramda';

const theme = mergeDeepRight(system, {
	// TODO: your stuff
});

console.log(theme);

const Exercise = () => (
	<ThemeProvider theme={theme}>
		<Box>Sandbox</Box>
	</ThemeProvider>
);

export default Exercise;
