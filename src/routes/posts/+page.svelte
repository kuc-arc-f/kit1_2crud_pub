<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
/** @type {import('./$types').PageData} */
export let data;
console.log(data);
//console.log(data.items);
  </script>

<div class="container my-2">
	<a href={`/`} class="btn btn-outline-primary">Top
	</a>
	<hr />
	<h1>posts</h1>
	<a href={`/posts/create`} class="btn btn-primary">Create
	</a>
	<hr />
	{#each data.items as item}
	<div>
		<h3>{item.title}</h3>
		<p>ID : {item.id}</p>
		<a href={`/posts/${item.id}`} class="btn">[ show ]
		</a>		
		<a href={`/posts/edit/${item.id}`} class="btn">[ Edit ]
		</a>		
		<hr />
	</div>
	{/each}	
</div>
