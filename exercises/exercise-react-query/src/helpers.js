import React, { useState } from 'react';
import { Button, Flex, Input, Label } from 'theme-ui';

export const getRandomId = () => Math.round(Math.random() * 100000);

export const Center = ({ children }) => (
	<Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
		{children}
	</Flex>
);

export const TodoForm = ({ onAddTodo }) => {
	const [todo, setTodo] = useState('');

	return (
		<form
			id="todo"
			onSubmit={event => {
				event.preventDefault();

				if (!todo) {
					return;
				}

				onAddTodo(todo);

				setTodo('');
			}}
		>
			<Label htmlFor="todo">What to do?</Label>
			<Input
				id="todo"
				value={todo}
				onChange={event => setTodo(event.target.value)}
			/>

			<Button type="submit" sx={{ my: 2 }}>
				Add
			</Button>
		</form>
	);
};
