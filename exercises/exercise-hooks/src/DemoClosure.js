// describe useEffect synchronization
// Remove unnecessary change of title by deps:
// - steps: undefined, [], [enabled]

import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Label, Text } from 'theme-ui';

const Child = ({ random }) => {
	const [value, setValue] = useState(0);
	const [enabled, setEnabled] = useState(true);

	useEffect(() => {
		setTimeout(() => console.log({ random, enabled, value }), 3000);
	});

	// unnecessary render everytime the value changed
	useEffect(() => {
		document.title = `Random: ${random}`;
	});

	return (
		<Box>
			<Text>Current value: {value}</Text>
			<Text>Random: {random}</Text>

			<Button
				type="button"
				onClick={() => {
					setValue(x => x + 1);
				}}
				variant="outline"
			>
				+
			</Button>
			<Button
				type="button"
				onClick={() => {
					setEnabled(x => !x);
				}}
				variant="outline"
			>
				{enabled ? 'Disable' : 'Enable'}
			</Button>
		</Box>
	);
};
const Parent = () => {
	const [random, setRandom] = useState(Math.random());

	return (
		<Box>
			<Child random={random} />

			<Button onClick={() => setRandom(Math.random())} sx={{ mt: 4 }}>
				Roll
			</Button>
		</Box>
	);
};

export default Parent;
