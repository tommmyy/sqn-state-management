// Custom hook - useInterval
// Syncing with useRef
// Introduce useCommitedRef

import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, Text } from '@workshop/ui-components';

// const useInterval = (callback, interval) => {
// 	if (interval) {
// 		setInterval(callback, interval);
// 	}
// };
// const useInterval = (callback, interval) => {
// 	useEffect(() => {
// 		if (typeof interval === 'number') {
// 			setInterval(callback, interval);

// 		}
// 	}, [callback, interval]);
// };

const useCommitedRef = fn => {
	const fnRef = useRef(fn);
	useEffect(() => {
		fnRef.current = fn;
	});
	return fnRef;
};

// const useInterval = (callback, interval) => {
// 	useEffect(() => {
// 		if (typeof interval === 'number') {
// 			const id = setInterval(callback, interval);

// 			return () => clearInterval(id);
// 		}
// 	}, [interval, callback]);
// };
const useInterval = (callback, interval) => {
	const cbRef = useCommitedRef(callback);

	useEffect(() => {
		if (typeof interval === 'number') {
			const tick = () => {
				cbRef.current();
			};
			const id = setInterval(tick, interval);

			return () => clearInterval(id);
		}
	}, [interval, cbRef]);
};
const CounterApp = ({ random }) => {
	const [counter, setCounter] = useState(0);
	const [interval, setInterval] = useState(null);

	useInterval(() => {
		console.log('counter', counter, random);

		setCounter(x => x + 1);
	}, interval);

	const handleClick = () => setInterval(interval ? null : 2000);

	return (
		<Box>
			<Heading>Demo useInterval</Heading>
			<Text>counter: {counter}</Text>
			<Text>incomming random: {random}</Text>
			<Text>
				<Button onClick={handleClick}>
					{interval ? 'Set interval' : 'Unset interval'}
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
