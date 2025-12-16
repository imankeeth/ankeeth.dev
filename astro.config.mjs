// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://ankeeth.dev",
	output: "server",

	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),

	integrations: [
		react(),
		mdx(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		sitemap(),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
