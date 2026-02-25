import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "ankeeth.dev",
    },
  },
  collections: {
    writings: collection({
      label: "Writings",
      slugField: "title",
      path: "src/content/writings/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.text({ label: "Date" }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        coverImage: fields.text({ label: "Cover Image URL" }),
        hasAudio: fields.checkbox({ label: "Has Audio", defaultValue: false }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
    experiments: collection({
      label: "Experiments",
      slugField: "title",
      path: "src/content/experiments/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Beta", value: "Beta" },
            { label: "Prototype", value: "Prototype" },
            { label: "Stable", value: "Stable" },
            { label: "Archived", value: "Archived" },
          ],
          defaultValue: "Prototype",
        }),
        version: fields.text({ label: "Version" }),
        description: fields.text({ label: "Description", multiline: true }),
        techStack: fields.array(fields.text({ label: "Tech" }), {
          label: "Tech Stack",
          itemLabel: (props) => props.value,
        }),
        icon: fields.select({
          label: "Icon",
          options: [
            { label: "Terminal", value: "Terminal" },
            { label: "Layers", value: "Layers" },
            { label: "Bot", value: "Bot" },
            { label: "Workflow", value: "Workflow" },
            { label: "Cpu", value: "Cpu" },
            { label: "Zap", value: "Zap" },
          ],
          defaultValue: "Terminal",
        }),
        githubUrl: fields.text({ label: "GitHub URL" }),
        demoUrl: fields.text({ label: "Demo URL" }),
        date: fields.text({ label: "Date" }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
    services: collection({
      label: "Services",
      slugField: "title",
      path: "src/content/services/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        icon: fields.select({
          label: "Icon",
          options: [
            { label: "Rocket", value: "Rocket" },
            { label: "Cpu", value: "Cpu" },
            { label: "BrainCircuit", value: "BrainCircuit" },
          ],
          defaultValue: "Rocket",
        }),
        deliverables: fields.array(fields.text({ label: "Deliverable" }), {
          label: "Deliverables",
          itemLabel: (props) => props.value,
        }),
        targetAudience: fields.text({ label: "Target Audience" }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
  },
});
