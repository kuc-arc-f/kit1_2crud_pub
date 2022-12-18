<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
//export const ssr = false;
import LibSqlite from '$lib/LibSqlite';
import LibStorage from '$lib/LibStorage';

/** @type {import('./$types').PageData} */
export let data: any;
//export let aaa;
console.log(data);

/**
 * savePost
 * @param
 *
 * @return
 */ 
const savePost = async function () {
	try {
		const title = document.querySelector<HTMLInputElement>('#title');
		const content = document.querySelector<HTMLInputElement>('#content');			
		const db = await LibSqlite.getDb();
		const sql = `
		UPDATE Post set title = '${title?.value}' , 
		content = '${content?.value}'
		WHERE id = ${data.id}
		`;
		await db.exec(sql);
		await LibStorage.save(db);
//console.log(title.value)
//console.log(result)     
    window.location.href = '/posts'
  } catch (error) {
    console.error(error);
  } 
}
/**
 * deleteItem
 * @param
 *
 * @return
 */ 
async function deleteItem(){
  try {
	const db = await LibSqlite.getDb();
      const sql = `
      DELETE FROM Post WHERE id = ${data.id}
      `;
      await db.exec(sql);
      await LibStorage.save(db);
	  window.location.href = '/posts'
  } catch (error) {
    console.error(error);
  }
}
</script>

<div class="container my-2">
	<a href={`/posts`} class="btn">[ Back ]
	</a>		
	<h1>Edit</h1>
	ID: {data.id}
	<hr />
	<div class="col-sm-6">
		<label>Title:</label>
        <input type="text" name="title" id="title" class="form-control" value= {data.title}
           />		
	</div>
	<div class="col-sm-6">
        <label>Content:</label>
        <textarea name="content" id="content" class="form-control" rows="6"
          placeholder="">{data.content}</textarea>
	</div>	
	<button on:click={savePost} class="btn btn-primary my-2">Save</button>
	<button on:click={deleteItem} class="btn btn-danger my-2">Delete</button>
</div>
<!--
-->