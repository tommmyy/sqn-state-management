import React from 'react';
import { Box, Button, ThemeProvider } from 'theme-ui';
import { system, tailwind } from '@theme-ui/presets';
import { mergeDeepLeft } from 'ramda';
// Box.sx
// - padding vs px,py...,
// - responsive value, color: primary
// - sx vs props
// ThemeProvider - use @theme-ui/presets: tailwind -> system
// - space, fontSizes
// other components - Flex, Box, Text, Heading
// "as" property
// extend theme
// custom variants for Button, nav link

const theme = {
	...tailwind,
	buttons: {
		primary: {
			color: '#000',
			fontWeight: 'bokkkkkd',
		},
	},
};

console.log(theme);

const DemoThemeUi = () => (
	<ThemeProvider theme={theme}>
		<Box
			sx={{
				p: [2, 2, 2, 2, 5],
				fontSize: [2, 3, 4, 5],
				color: 'primary',
			}}
		>
			x
		</Box>
		<Button variant="buttons.primary">Button</Button>
	</ThemeProvider>
);

export default DemoThemeUi;
