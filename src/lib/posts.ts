export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	author: string;
	tags: string[];
}

export const posts: BlogPost[] = [
	{
		slug: 'getting-started-with-sveltekit',
		title: 'Getting Started with SvelteKit',
		excerpt:
			'Learn how to build modern web applications with SvelteKit, the official framework for Svelte.',
		content: `
# Getting Started with SvelteKit

SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.

## Why SvelteKit?

- **Fast by default**: Optimized builds with automatic code splitting
- **Flexible routing**: File-based routing with nested layouts
- **Full-stack**: Built-in support for server-side rendering and API routes
- **Developer experience**: Hot module replacement, TypeScript support, and more

## Getting Started

To create a new SvelteKit project:

\`\`\`bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

That's all you need to get started!
		`,
		date: '2025-10-01',
		author: 'John Doe',
		tags: ['sveltekit', 'web development', 'tutorial']
	},
	{
		slug: 'tailwind-css-best-practices',
		title: 'Tailwind CSS Best Practices',
		excerpt:
			'Discover essential tips and patterns for writing maintainable Tailwind CSS code in your projects.',
		content: `
# Tailwind CSS Best Practices

Tailwind CSS is a utility-first CSS framework that can help you build modern websites quickly. Here are some best practices to follow.

## Keep Your Classes Organized

Use consistent ordering for your utility classes:
1. Layout (display, position)
2. Sizing (width, height)
3. Spacing (margin, padding)
4. Typography
5. Visual (colors, borders, shadows)

## Use the @apply Directive Sparingly

While @apply can be useful, overusing it defeats the purpose of utility-first CSS. Use it primarily for component classes you reuse frequently.

## Leverage the Configuration File

Customize Tailwind to match your design system by extending the default theme in your config file.

\`\`\`js
export default {
  theme: {
    extend: {
      colors: {
        brand: '#3490dc',
      },
    },
  },
}
\`\`\`
		`,
		date: '2025-09-28',
		author: 'Jane Smith',
		tags: ['tailwindcss', 'css', 'best practices']
	},
	{
		slug: 'building-a-blog-with-mdsvex',
		title: 'Building a Blog with MDsveX',
		excerpt: 'How to create a blog using MDsveX to write your posts in Markdown within SvelteKit.',
		content: `
# Building a Blog with MDsveX

MDsveX allows you to write Svelte components in Markdown, making it perfect for blogs and documentation sites.

## What is MDsveX?

MDsveX is a preprocessor for Svelte that allows you to use Markdown and Svelte components together. You can write your content in Markdown while still having access to all the power of Svelte.

## Setup

Install MDsveX:

\`\`\`bash
npm install -D mdsvex
\`\`\`

Configure it in your \`svelte.config.js\`:

\`\`\`js
import { mdsvex } from 'mdsvex';

export default {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsvex()],
};
\`\`\`

## Writing Posts

Now you can create \`.md\` files in your routes directory and they'll be treated as Svelte components!
		`,
		date: '2025-09-25',
		author: 'John Doe',
		tags: ['mdsvex', 'markdown', 'sveltekit', 'blog']
	}
];
