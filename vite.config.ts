import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages"
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig({
	resolve: { 
		alias: { 
			"@": "/src"
		}},
	plugins: [
		vue(),
		Pages(),
		nodePolyfills({
			include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
		})
    ],
});