import { json } from '@sveltejs/kit';
import { getBlogPosts } from '$lib/posts';

export async function GET() {
  const blogPosts = await getBlogPosts();
  return json(blogPosts);
}
