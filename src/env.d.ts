/// <reference path="../.astro/types.d.ts" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}

// biome-ignore lint/complexity/noBannedTypes: Env interface is extended with Cloudflare bindings
type Env = {};
