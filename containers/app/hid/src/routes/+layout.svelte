<script>
	import { page, navigating, updated } from '$app/stores';
</script>

<nav>
	<a href="/" aria-current={$page.url.pathname === '/'}>
		home
	</a>

	<a href="/about" aria-current={$page.url.pathname === '/about'}>
		about
	</a>

	<a href="/blog" aria-current={$page.url.pathname === '/blog'}>
		blog
	</a>	

	<a href="/expected">page with expected error</a>
	
	<a href="/unexpected">page with unexpected error</a>	

	{#if $navigating}
		navigating to {$navigating.to.url.pathname}
	{/if}
</nav>

<slot />

{#if $updated}
	<p class="toast">
		A new version of the app is available

		<button on:click={() => location.reload()}>
			reload the page
		</button>
	</p>
{/if}