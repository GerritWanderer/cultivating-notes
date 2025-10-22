import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const index = await import(`../notes/index.md`);

		return {
			content: index.default,
			meta: index.metadata
		};
	} catch (e) {
		error(404, `Could not find index: ${e}`);
	}
}
