// describe useEffect synchronization
// deps: undefined, [], [enabled]

import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Label, Text } from 'theme-ui';

const Demo = () => {
	const [value, setValue] = useState(0);
	const [enabled, setEnabled] = useState(true);

	useEffect(() => {
		setTimeout(() => console.log(enabled, value), 3000);
	});

	return (
		<Box>
			<Text>Current value: {value}</Text>

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

export default Demo;
