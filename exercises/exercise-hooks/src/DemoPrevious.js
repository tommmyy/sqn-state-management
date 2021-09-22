// implement usePrevious
// describe useRef useEffect

import React, { useState } from 'react';
import { Box, Button, Flex, Input, Label, Text } from 'theme-ui';

const usePrevious = value => {};

const Demo = () => {
	const [value, setValue] = useState('');
	const prevValue = usePrevious(value);

	return (
		<Box>
			<Text>Current value: {value}</Text>
			<Text>Previous value: {prevValue}</Text>

			<form
				onSubmit={event => {
					event.preventDefault();
					const uncontrolledInput = document.getElementById('value');
					setValue(uncontrolledInput.value);
					uncontrolledInput.value = '';
				}}
			>
				<Label htmlFor="value" />
				<Input id="value" defaultValue={value} />

				<Flex sx={{ my: 2 }}>
					<Button type="submit" sx={{ mr: 2 }}>
						Set
					</Button>

					<Button
						type="button"
						onClick={() => {
							setValue(prevValue);
						}}
						variant="outline"
					>
						Back
					</Button>
				</Flex>
			</form>
		</Box>
	);
};

export default Demo;
