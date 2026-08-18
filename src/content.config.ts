import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Project pages are vendored from Keio-CSG/LabProjectPage as Markdown, so a new
 * project can be added by dropping a .md file into src/content/projects/.
 * The schema mirrors that repo's frontmatter. Teasers are SVGs served from
 * public/projects/, referenced by filename since vectors need no optimization.
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: () =>
    z.object({
      title: z.string(),
      short_title: z.string(),
      venue: z.string(),
      year: z.number(),
      status: z.enum(["published", "accepted", "preprint"]),
      section: z.enum(["Circuit", "Sensor"]),
      teaser: z.string().optional(),
      highlight: z.boolean().default(false),
      authors: z.array(z.object({ name: z.string(), me: z.boolean().default(false) })),
      tags: z.array(z.string()).default([]),
      links: z
        .object({
          paper: z.string().url().optional(),
          code: z.string().url().optional(),
          project: z.string().url().optional(),
          arxiv: z.string().url().optional(),
          press: z.string().url().optional(),
        })
        .default({}),
      description_ja: z.string(),
      order: z.number().optional(),
    }),
});

export const collections = { projects };
