import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OBSIDIAN_VAULT = path.join(process.env.HOME, 'Workspace', 'notes', '03-Garden');
const DEST_DIR = path.join(__dirname, 'src', 'notes');

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { frontmatter: {}, content };
	}

	const frontmatterText = match[1];
	const remainingContent = content.slice(match[0].length);

	// Parse YAML-like frontmatter
	const frontmatter = {};
	const lines = frontmatterText.split('\n');
	let currentKey = null;

	for (const line of lines) {
		// Check for key-value pair
		const kvMatch = line.match(/^(\w+):\s*(.*)$/);
		if (kvMatch) {
			const [, key, value] = kvMatch;
			currentKey = key;

			// Handle boolean values
			if (value === 'true') {
				frontmatter[key] = true;
			} else if (value === 'false') {
				frontmatter[key] = false;
			} else if (value.startsWith('"') && value.endsWith('"')) {
				// Remove quotes
				frontmatter[key] = value.slice(1, -1);
			} else if (value === '') {
				frontmatter[key] = '';
			} else {
				frontmatter[key] = value;
			}
		} else if (currentKey && line.startsWith('  - ')) {
			// Handle array values
			if (!Array.isArray(frontmatter[currentKey])) {
				frontmatter[currentKey] = [];
			}
			frontmatter[currentKey].push(line.slice(4));
		}
	}

	return { frontmatter, content: remainingContent };
}

/**
 * Serialize frontmatter to YAML format
 */
function serializeFrontmatter(frontmatter) {
	const lines = ['---'];

	for (const [key, value] of Object.entries(frontmatter)) {
		if (Array.isArray(value)) {
			lines.push(`${key}:`);
			for (const item of value) {
				lines.push(`  - ${item}`);
			}
		} else if (typeof value === 'boolean') {
			lines.push(`${key}: ${value}`);
		} else if (value === '') {
			lines.push(`${key}:`);
		} else if (typeof value === 'string' && (value.includes(':') || value.includes('[[') || value.includes('#'))) {
			lines.push(`${key}: "${value}"`);
		} else {
			lines.push(`${key}: ${value}`);
		}
	}

	lines.push('---');
	return lines.join('\n');
}

/**
 * Convert filename to slug
 */
function filenameToSlug(filename) {
	return filename
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-')     // Replace spaces with dashes
		.replace(/-+/g, '-')      // Replace multiple dashes with single dash
		.trim();
}

/**
 * Process a single note file
 */
async function processNote(filepath, filename) {
	const content = await fs.readFile(filepath, 'utf-8');
	const { frontmatter, content: bodyContent } = parseFrontmatter(content);

	// Only process notes with publish=true
	if (frontmatter.publish !== true) {
		return null;
	}

	// Get the original filename without extension
	const originalName = filename.replace(/\.md$/, '');

	// Determine the slug to use for the output filename
	const outputSlug = frontmatter.slug || filenameToSlug(originalName);

	// Add title metadata if not present (use original filename)
	if (!frontmatter.title) {
		frontmatter.title = originalName;
	}

	return {
		originalName,
		outputSlug,
		frontmatter,
		bodyContent
	};
}

/**
 * Convert wiki-style links to absolute paths
 * [[link]] -> /notes/link
 * [[path/to/link]] -> /notes/link
 * [[link|display text]] -> /notes/link (keeps display text)
 */
function convertWikiLinks(content, slugMap) {
	return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkContent) => {
		// Split by pipe to handle display text
		const [linkPath, displayText] = linkContent.split('|').map(s => s.trim());

		// Extract just the filename from the path (remove directory part)
		const linkFilename = linkPath.includes('/')
			? linkPath.split('/').pop()
			: linkPath;

		// Check if we have a slug mapping for this filename
		const targetSlug = slugMap[linkFilename] || filenameToSlug(linkFilename);

		// Create the absolute path
		const absolutePath = `/notes/${targetSlug}`;

		// Return markdown link with display text if provided
		if (displayText) {
			return `[${displayText}](${absolutePath})`;
		} else {
			return `[${linkFilename}](${absolutePath})`;
		}
	});
}

/**
 * Main function to copy and process notes
 */
async function copyNotes() {
	try {
		console.log('🌱 Starting note synchronization...\n');

		// Read all files from the Obsidian vault
		const files = await fs.readdir(OBSIDIAN_VAULT);
		const mdFiles = files.filter(f => f.endsWith('.md'));

		console.log(`Found ${mdFiles.length} markdown files in ${OBSIDIAN_VAULT}\n`);

		// First pass: Process all notes and build slug mapping
		const processedNotes = [];
		const slugMap = {}; // originalName -> outputSlug mapping

		for (const file of mdFiles) {
			const filepath = path.join(OBSIDIAN_VAULT, file);
			const result = await processNote(filepath, file);

			if (result) {
				processedNotes.push(result);
				slugMap[result.originalName] = result.outputSlug;
				console.log(`✓ Processed: ${file} -> ${result.outputSlug}.md`);
			} else {
				console.log(`- Skipped: ${file} (publish=false or missing)`);
			}
		}

		console.log(`\n📝 Processing ${processedNotes.length} notes with publish=true\n`);

		// Second pass: Write files with converted links
		for (const note of processedNotes) {
			// Convert wiki-style links to absolute paths
			const processedContent = convertWikiLinks(note.bodyContent, slugMap);

			// Reconstruct the full content
			const fullContent = serializeFrontmatter(note.frontmatter) + processedContent;

			// Write to destination
			const destPath = path.join(DEST_DIR, `${note.outputSlug}.md`);
			await fs.writeFile(destPath, fullContent, 'utf-8');

			console.log(`✓ Wrote: ${destPath}`);
		}

		console.log(`\n✨ Successfully synchronized ${processedNotes.length} notes!`);

	} catch (error) {
		console.error('❌ Error copying notes:', error);
		process.exit(1);
	}
}

// Run the script
copyNotes();
