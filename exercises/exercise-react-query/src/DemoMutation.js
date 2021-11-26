// yarn start rq-server
// Overview: useMutation
// - after mutate must be reload
// - use "invalidateQueries"
import React from 'react';
import axios from 'axios';
import {
	QueryClient,
	QueryClientProvider,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Box } from 'theme-ui';

import { TodoForm, getRandomId } from './helpers';

const TODOS_URL = 'http://localhost:4002/todos';

const Todos = () => {
	const { isLoading, isFetching, error, data } = useQuery('todos', async () => {
		await new Promise(resolve => setTimeout(resolve, 1000));

		return axios.get(TODOS_URL).then(response => response.data);
	});

	if (error) return `An error has occurred: ${error.message}`;

	if (isLoading) return 'Loading...';

	return (
		<Box>
			<Box as="ul">
				{data?.map(({ id, value }) => (
					<Box as="li" key={id}>
						{value}
					</Box>
				))}
			</Box>
			{isFetching && 'Fetching...'}
		</Box>
	);
};
const App = () => {
	const addTodoMutation = value =>
		axios.post(TODOS_URL, { id: getRandomId(), value });

	const client = useQueryClient();

	const { mutate: addTodo } = useMutation(addTodoMutation, {
		onSuccess: () => {
			// client.invalidateQueries('todos');
		},
	});

	return (
		<Box>
			<TodoForm onAddTodo={addTodo} />
			<Todos />
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
