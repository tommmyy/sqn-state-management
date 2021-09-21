import React from 'react';
import { Box, Button, Flex, Heading, Text, ThemeProvider } from 'theme-ui';
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

const theme = mergeDeepLeft(
	{
		buttons: {
			elevated: {
				color: 'primary',
			},
		},
		links: {
			nav: {
				color: 'secondary',
			},
		},
	},
	tailwind
);

console.log(theme);

const DemoThemeUi = () => (
	<ThemeProvider theme={theme}>
		<Flex
			sx={{
				p: [1, 2, 4],
				flexDirection: ['column', 'column', 'row'],
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Heading>Text</Heading>
			<Text sx={{ color: 'primary' }}>Text</Text>
			<Box>Box</Box>
			<Button variant="elevated">Button</Button>
			<Text variant="links.nav">custom variant</Text>
		</Flex>
	</ThemeProvider>
);

export default DemoThemeUi;
