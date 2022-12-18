//export const ssr = false;
import { error } from '@sveltejs/kit';
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  category : string,
  createdAt: string,
}

//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
console.log("id=", params.id);
    return {
      };  
//    throw error(404, 'Not found');
}
