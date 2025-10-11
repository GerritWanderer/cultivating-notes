import type { BlogPost } from '$lib/types'

export async function getBlogPosts() {
  let blogPosts: BlogPost[] = []
  const paths = import.meta.glob('/src/blog/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<BlogPost, 'slug'>;
      const post = { ...metadata, slug } satisfies BlogPost;
      blogPosts.push(post);
    }
  }

  return blogPosts;
}
