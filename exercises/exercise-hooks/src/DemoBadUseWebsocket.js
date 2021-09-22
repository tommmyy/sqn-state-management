// show stale randomValue
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, Input, Label, Select, Text } from 'theme-ui';

const noop = () => {};

const useWebsocket = ({
	url,
	onClose = noop,
	onError = noop,
	onOpen = noop,
	onMessage = noop,
}) => {
	const ws = useRef();

	// const setupWs = useCallback(() => {
	const setupWs = () => {
		ws.current = new WebSocket(url);

		ws.current.onmessage = resp => onMessage(JSON.parse(resp.data));

		ws.current.onopen = (...args) => {
			onOpen(...args);
		};

		ws.current.onerror = error => {
			console.log(error);

			onError(error);
		};

		ws.current.onclose = (...args) => {
			onClose(...args);
		};
	};
	// }, [onClose, onError, onMessage, onOpen, url]);

	const close = () => {
		if (ws.current) {
			ws.current.close();
		}
	};

	const connect = () => {
		close();

		setupWs();
	};

	useEffect(() => {
		if (ws.current) {
			connect();
			return () => close();
		}
	}, [url]);

	const send = frame => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.send(JSON.stringify(frame));
		}
	};

	return {
		connect,
		close,
		send,
		ws,
	};
};

const endpoints = ['/v1', '/v2'];

const Example = () => {
	// Better use useReducer!!!
	const [numberOfClients, setNumberOfClients] = useState();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [randomValue, setRandomValue] = useState('');
	const [url, setUrl] = useState(endpoints[0]);

	const { connect, close, send } = useWebsocket({
		url: process.env.GATSBY_API_URL_WS + url,
		onMessage: message => {
			console.log({ randomValue });

			setNumberOfClients(message.numberOfClients);
			setMessages(message.messages);
		},
		onClose: () => {
			setNumberOfClients(null);
		},
	});

	return (
		<section>
			<Heading>useWebsocket... badly</Heading>
			<Button variant="outline" sx={{ mr: 1 }} onClick={() => connect()}>
				Connect
			</Button>

			<Button variant="outline" onClick={() => close()}>
				Close
			</Button>

			<Box as="hr" sx={{ my: 4 }} />

			<form
				onSubmit={event => {
					event.preventDefault();

					send({ message });
					setMessage('');
				}}
			>
				<Label htmlFor="message">Message</Label>
				<Input
					id="message"
					value={message}
					onChange={event => setMessage(event.target.value)}
				/>

				<Label htmlFor="url">URL:</Label>
				<Select
					id="url"
					onChange={event => {
						setUrl(event.target.value);
					}}
					value={url}
				>
					{endpoints.map(value => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</Select>

				<Label htmlFor="randomValue">Random value to prove the point</Label>
				<Input
					id="randomValue"
					value={randomValue}
					onChange={event => setRandomValue(event.target.value)}
				/>

				<Button type="submit" sx={{ my: 2 }}>
					Send
				</Button>
			</form>

			<Box as="hr" sx={{ my: 4 }} />

			<Text>Number of connected clients: {numberOfClients}</Text>
			<Box as="pre">{JSON.stringify(messages, null, 2)}</Box>
		</section>
	);
};

export default Example;
