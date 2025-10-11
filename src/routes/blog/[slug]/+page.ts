import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const blog = await import(`../../../blog/${params.slug}.md`);

    return {
      content: blog.default,
      meta: blog.metadata
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
};
