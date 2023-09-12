// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.
const database = new Map();

export function getTodos(userid) {
	if (!database.has(userid)) {
		createTodo({ userid, description: 'Learn about API routes' });
	}
	return Array.from(database.get(userid).values());
	
	// if (!database.get(userid)) {
	// 	database.set(userid, [{
	// 		id: crypto.randomUUID(),
	// 		description: 'Learn SvelteKit',
	// 		done: false
	// 	}]);
	// }

	// return database.get(userid);
}

export function createTodo({userid, description}) {
	if (!database.has(userid)) {
		database.set(userid, new Map());
	}

	const todos = database.get(userid);

	const id = crypto.randomUUID();

	todos.set(id, {
		id,
		description,
		done: false
	});

	return {
		id
	};	
	// if (description === '') {
	// 	throw new Error('todo must have a description');
	// }

	// const todos = database.get(userid);

	// if (todos.find((todo) => todo.description === description)) {
	// 	throw new Error('todos must be unique');
	// }

	// todos.push({
	// 	id: crypto.randomUUID(),
	// 	description,
	// 	done: false
	// });
}

export function toggleTodo({ userid, id, done }) {
	const todos = database.get(userid);
	todos.get(id).done = done;
}

export function deleteTodo({ userid, id }) {
	const todos = database.get(userid);
	todos.delete(id);
}

// export function deleteTodo(userid, todoid) {
// 	const todos = database.get(userid);
// 	const index = todos.findIndex((todo) => todo.id === todoid);

// 	if (index !== -1) {
// 		todos.splice(index, 1);
// 	}
// }
