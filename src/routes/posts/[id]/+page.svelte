<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
/** @type {import('./$types').PageData} */
export let data;
console.log(data);
</script>

<!-- MarkUp -->
<div class="container my-2">
	<a href={`/posts`} class="btn">[ Back ]
	</a>		
	<h1>{data.title}</h1>
	ID: {data.id}
	<hr />
	<div>{@html data.content}</div>
	<hr />
</div>
