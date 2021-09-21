// step 1 - Solution
import React from 'react';
import PropTypes from 'prop-types';
import { mapResponsiveProperty } from '@workshop/utils';
import {
	Box,
	Button,
	Card,
	Flex,
	Heading,
	Text,
	ThemeProvider,
} from 'theme-ui';
import { system } from '@theme-ui/presets';
import { mergeDeepLeft } from 'ramda';

const theme = mergeDeepLeft(
	{
		// sizes: [0, '10px', '100px', '200px', '300px', '400px'],
		space: [0, '10px', '100px', '200px', '300px', '400px'],
		shadows: {
			weak: '0 0 8px rgba(0, 0, 0, 0.125)',
		},
		radii: {
			primary: 8,
		},
		text: {
			mono: {
				fontFamily: 'monospace',
				letterSpacing: '-1px',
				backgroundColor: 'muted',
				color: 'secondary',
				px: [1, 2],
			},
			inline: {},
		},
		cards: {
			primary: {
				padding: 2,
				borderRadius: 'primary',
				boxShadow: 'weak',
			},
		},
	},
	system
);

console.log(theme);

const InlineText = ({ variant = 'inline', ...rest }) => (
	<Text as="span" variant={variant} {...rest} />
);

const Mono = ({ variant = 'mono', ...rest }) => (
	<InlineText variant={variant} {...rest} />
);

// NOTE: unnecessary optimization in this case
const styles = {
	root: { height: '100vh', alignItems: 'center', justifyContent: 'center' },
	body: { alignItems: 'center' },
	content: { p: [3, 4, 5] },
};

const ThemeUi = () => (
	<ThemeProvider theme={theme}>
		<Flex sx={styles.root}>
			<Card>
				<Flex sx={styles.body}>
					<Box sx={styles.content}>
						<Heading>Tomas Konrady</Heading>
						<Text>
							<InlineText>Phone number:</InlineText>
							<Mono>777 777 777</Mono>
						</Text>
						<Button as="a" href="tel://420777777777">
							Contact me
						</Button>
					</Box>
					<Box>
						<img src="https://via.placeholder.com/150" />
					</Box>
				</Flex>
			</Card>
		</Flex>
	</ThemeProvider>
);

export default ThemeUi;
