import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import Vue from "@vitejs/plugin-vue";

import UnoCSS from "unocss/vite";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		Vue(),
		UnoCSS(),
		Components(),
		AutoImport({
			dts: true,
			dirs: ["src/stores"],
			imports: ["vue", "pinia", "@vueuse/core"],
		}),
		VitePWA({
			injectRegister: "auto",
			registerType: "prompt",
			devOptions: {
				enabled: false,
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,json,webp,wav,txt}"],
			},
			strategies: "generateSW",
			filename: "root.js",
			minify: true,
			outDir: "dist",
			disable: false,
			manifest: {
				display: "standalone",
				name: "PEPPC",
				short_name: "PEPPC",
				description: "Plano Econômico Para Pessoas Cinéfilas!",
				lang: "pt-BR",
				theme_color: "#6366F1",
				background_color: "#6366F1",
				orientation: "any",
				id: "peppc",
				icons: [
					{
						src: "192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
