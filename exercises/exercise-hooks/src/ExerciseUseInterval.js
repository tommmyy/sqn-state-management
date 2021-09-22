import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, Text } from '@workshop/ui-components';

const useCommitedRef = value => {
	const commitedRef = useRef(value);

	useEffect(() => {
		commitedRef.current = value;
	});
	return commitedRef;
};

const useInterval = (callback, interval, enabled) => {
	const latestCallback = useCommitedRef(callback);

	useEffect(() => {
		if (typeof interval === 'number') {
			const tick = () => {
				latestCallback.current();
			};

			const id = setInterval(tick, interval);

			return () => clearInterval(id);
		}
	}, [interval, enabled]);
};

const CounterApp = ({ random }) => {
	const [counter, setCounter] = useState(0);
	const [interval, setInterval] = useState(null);
	const [enabled, setEnabled] = useState(true);

	useInterval(() => {
		console.log('counter', counter, random);

		setCounter(counter + 1);
	}, interval);

	const handleClick = () => setInterval(interval ? null : 2000);

	return (
		<Box>
			<Heading>ExerciseUseInterval</Heading>
			<Text>counter: {counter}</Text>
			<Text>incomming random: {random}</Text>
			<Text>
				<Button onClick={handleClick} sx={{ mr: 2 }}>
					{interval ? 'Unset interval' : 'Set interval'}
				</Button>
			</Text>
		</Box>
	);
};

const Demo = () => {
	const [random, setRandom] = useState(0);

	useEffect(() => {
		const id = setTimeout(() => {
			setRandom(Math.random());
		}, 1000);

		return () => clearTimeout(id);
	});

	return <CounterApp random={random} />;
};

export default Demo;
