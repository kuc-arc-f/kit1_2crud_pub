<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
export const ssr = false;
import LibSqlite from '../../../lib/LibSqlite';
import LibStorage from '../../../lib/LibStorage';

/** @type {import('./$types').PageData} */
export let data;
console.log(data);

/**
 * addPost
 * @param
 *
 * @return
 */ 
const addPost = async function () {
console.log("add");
	try{
		const title = document.querySelector<HTMLInputElement>('#title');
		const content = document.querySelector<HTMLInputElement>('#content');
		const category = document.querySelector<HTMLInputElement>('#category');
		//content
		console.log(title?.value);
		const db = await LibSqlite.getDb();
		const sql = `
		INSERT INTO Post(title, content, CategoryId, createdAt, updatedAt)
		VALUES
		(
			'${title?.value}', 
			'${content?.value}',
			'${category?.value}',
			DATETIME('now','localtime'), 
			DATETIME('now','localtime')
		);
		`;
		await db.exec(sql);
		await LibStorage.save(db);	
		window.location.href = '/posts'   
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
</script>

<div class="container my-2">
	<a href={`/posts`} class="btn">[ Back ]
	</a>		
	<h1>Create</h1>
	<hr />
	<div class="col-sm-6">
		<label>Title:</label>
        <input type="text" name="title" id="title" class="form-control"
           />		
	</div>
	<div class="col-sm-6">
        <label>Content:</label>
        <textarea name="content" id="content" class="form-control" rows="6"
          placeholder=""></textarea>
	</div>	
	<button on:click={addPost} class="btn btn-primary my-2">Add</button>
	<hr />
</div>
