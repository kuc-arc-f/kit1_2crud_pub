import { error } from '@sveltejs/kit';
import LibSqlite from '$lib/LibSqlite';
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  category : string,
  createdAt: string,
}
/**
* getItem
* @param
*
* @return
*/   
const getItem = async function(id: number) {
  try {   
    const db = await LibSqlite.getDb();
    let post: any = {};
    const sql = `
    select
    Post.id ,
    Post.title,
    Post.content,
    Post.createdAt,
    Category.name
    from Post
    LEFT OUTER JOIN Category
    ON Post.CategoryId = Category.id
    WHERE 
    Post.id = ${id};
    `;
    let item = await LibSqlite.select(db, sql);
    item = item[0];
    let row: any = {
      id: 0, title: "", content: "", createdAt: "", categoryName: "",
    };
    if(item.length > 0) {
      row.id = item[0];
      row.title = item[1];
      row.content = item[2];
    }      
    post = row;
    return post;
  } catch (e) {
    console.error(e);
    alert("error, getItem");
  }
}
//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
console.log("id=", params.id);
  const item = await getItem(Number(params.id));
  console.log(item);
    return {
        id: item.id,
        title: item.title,
        content: item.content,
      };  
//    throw error(404, 'Not found');
}
/*
title: 'Hello world: id=' + params.id,
content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
*/