import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	// plugins: [react()],
	server: {
		proxy: {
			// "/api": "http://localhost:8000/",
			// "/socket": "http://localhost:7000/",
			// "/peer": "http://localhost:9000/",
		},
	},
	build: {
		outDir: "build", //build //dist
		manifest: true,
		target: "esnext",
		/*rollupOptions: {
			input: "./scripts/index.js",
		},*/
	},
})
