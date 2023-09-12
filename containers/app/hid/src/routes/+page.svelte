<script>
	import { fly, slide } from 'svelte/transition';
	import { message } from '$lib/message.js';
	import { enhance } from '$app/forms';
	export let data;
	export let form;
	let creating = false;
	let deleting = [];
	/** @type {number} */
	let number;
	async function roll() {
		const response = await fetch('/roll');
		number = await response.json();
	}
</script>

<h1>home</h1>
<p>this is the home page.</p>

<h1>Hello {data.visited ? 'friend' : 'stranger'}!</h1>
<p>{message}</p>

<div class="centered">
	<h1>todos</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<!-- <form method="POST" 
	    action="?/create"
		use:enhance={() => {
			creating = true;
			return async ({ update }) => {
				await update();
				creating = false;
			};
		}}
	> -->
		<label>
			add a todo:
			<input
				type="text"
				disabled={creating}
				name="description"
				value={form?.description ?? ''}
				autocomplete="off"
				required
				on:keydown={async (e) => {
					if (e.key === 'Enter') {
						const input = e.currentTarget;
						const description = input.value;
						
						const response = await fetch('/todo', {
							method: 'POST',
							body: JSON.stringify({ description }),
							headers: {
								'Content-Type': 'application/json'
							}
						});

						const { id } = await response.json();

						data.todos = [...data.todos, {
							id,
							description
						}];

						input.value = '';
					}
				}}
			/>
		</label>
	<!-- </form> -->

	<ul class="todos">
		{#each data.todos as todo (todo.id)}
			<li in:fly={{ y: 20 }} out:slide>
				<form method="POST" 
					action="?/delete" 
					use:enhance={() => {
					deleting = [...deleting, todo.id];
						return async ({ update }) => {
							await update();
							deleting = deleting.filter((id) => id !== todo.id);
						};
					}}
				>
					<input type="hidden" name="id" value={todo.id} />
					<input
						type="checkbox"
						checked={todo.done}
						on:change={async (e) => {
							const done = e.currentTarget.checked;
							await fetch(`/todo/${todo.id}`, {
								method: 'PUT',
								body: JSON.stringify({ done }),
								headers: {
									'Content-Type': 'application/json'
								}
							});
						}}
					/>
					<span>{todo.description}</span>
					<button 
						aria-label="Mark as complete"
						on:click={async (e) => {
							await fetch(`/todo/${todo.id}`, {
								method: 'DELETE'
							});
							data.todos = data.todos.filter((t) => t !== todo);
						}}
					/>
				</form>
			</li>
		{/each}
	</ul>

	{#if creating}
		<span class="saving">saving...</span>
	{/if}

	<button on:click={roll} style="height:5em;width:20em;border:2px solid black;background:none;opacity:1;color:black;">Roll the dice</button>

	{#if number !== undefined}
		<p>You rolled a {number}</p>
	{/if}

</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background: url(./remove.svg) no-repeat 50% 50%;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
</style>
