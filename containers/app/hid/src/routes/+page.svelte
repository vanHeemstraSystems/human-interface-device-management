<script>
	export let data;
	import { message } from '$lib/message.js';
</script>

<h1>home</h1>
<p>this is the home page.</p>

<h1>Hello {data.visited ? 'friend' : 'stranger'}!</h1>
<p>{message}</p>