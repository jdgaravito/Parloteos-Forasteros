import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const portfolio = defineCollection({
    loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        technologies: z.array(z.string()),
        githubUrl: z.string().optional(),
        liveUrl: z.string().optional(),
        figmaUrl: z.string().optional(),
        featured: z.boolean().default(false),
        completionDate: z.coerce.date(),
    }),
});

export const collections = { blog , portfolio };
