import { posts } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	};
};
