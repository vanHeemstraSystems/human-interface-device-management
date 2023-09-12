// export function load({ cookies }) {
// 	const visited = cookies.get('visited');

// 	cookies.set('visited', 'true', { path: '/' });

// 	return {
// 		visited
// 	};
// }

import { fail } from '@sveltejs/kit';
import * as database from '$lib/server/database.js';

export function load({ cookies }) {
	let userid = cookies.get('userid');

	if (!userid) {
		userid = crypto.randomUUID();
		cookies.set('userid', userid, { path: '/' });
	}

	return {
		todos: database.getTodos(userid)
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000)); // Deliberate delay for testing, remove in production!!
		const data = await request.formData();

		try {
			database.createTodo(cookies.get('userid'), data.get('description'));
		} catch (error) {
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}
	},

	delete: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000)); // Deliberate delay for testing, remove in production!!
		const data = await request.formData();
		database.deleteTodo(cookies.get('userid'), data.get('id'));
	}
};