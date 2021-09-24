// QueryClientProvider
// useQuery - arguments, state
// DevTools
// throw error
// console.log to show refetching on error
// add isFetching - focus on window
//
// 3rd arg { refetchOnWindowFocus:false }
// {staleTime:Infinity }
// {cacheTime:5000 }
// Second <Pokemns /> -> API communication
// Second <Pokemns /> with different queryKey -> API communication
//
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
import React, { useState } from 'react';
import { Box, Button, Flex, Text } from 'theme-ui';

const Pokemns = () => {
	const { isLoading, isFetching, error, data } = useQuery(
		'pokemon',
		() => {
			console.debug('Trying to fetch');
			// return Promise.resolve().then(() => {
			//   throw new Error("No pokemon");
			// });

			return axios
				.get('https://pokeapi.co/api/v2/pokemon/')
				.then(response => response.data.results);
		},
		{ cacheTime: 5000 }
	);

	if (isLoading) return 'Loading...';

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<Box>
			{isFetching && 'Fetching...'}
			{data.map(({ name }) => (
				<Text key={name}>{name}</Text>
			))}
		</Box>
	);
};

const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box>
			<Button onClick={() => setIsOpen(!isOpen)} maxWidth="size-100">
				{isOpen ? 'Close' : 'Open'}
			</Button>
			<Flex>{isOpen && <Pokemns />}</Flex>
		</Box>
	);
};

const queryClient = new QueryClient();

const Demo = () => (
	<QueryClientProvider client={queryClient}>
		<Box>
			<App />
			<ReactQueryDevtools initialIsOpen={false} />
		</Box>
	</QueryClientProvider>
);
export default Demo;
