import { defineCollection, z } from "astro:content";

const writings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    hasAudio: z.boolean().default(false),
  }),
});

const experiments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    status: z.enum(["Beta", "Prototype", "Stable", "Archived"]).default("Prototype"),
    version: z.string().optional(),
    description: z.string().optional(),
    techStack: z.array(z.string()).default([]),
    icon: z.string().default("Terminal"),
    githubUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    date: z.string().optional(),
  }),
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    icon: z.string().default("Rocket"),
    deliverables: z.array(z.string()).default([]),
    targetAudience: z.string().optional(),
  }),
});

export const collections = {
  writings,
  experiments,
  services,
};
