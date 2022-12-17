import { dev } from '$app/environment';
export const ssr = false;
import { error } from '@sveltejs/kit';
import LibSqlite from '../../lib/LibSqlite';
//type
type TPostItem = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  categoryName: string, 
}
const getList = async function (): Promise<any> 
{
  try {   
    let postItem: any[] = [];
    const db = await LibSqlite.getDb();
    const sql = `
    select
    Post.id ,
    Post.title
    from Post
    ORDER BY id DESC
    ;
    `;
console.log(sql);
    const result = await LibSqlite.select(db, sql);
    if(result === null) {
      return [];
    }
    result.forEach(function (item: any){
      let row: TPostItem = {
        id: 0, title: "", content: "", createdAt: "", categoryName: "",
      };
      if(item.length > 0) {
        row.id = item[0];
        row.title = item[1];
      }
      postItem.push(row);
    });    
//    postItem = result;    
    return postItem;

  } catch (e) {
    console.error(e);
  }
}
//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const items = await getList();
console.log(items);

    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
      items: items,
    };
//    throw error(404, 'Not found');
  }