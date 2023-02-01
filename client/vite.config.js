import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	// plugins: [react()],
	server: {
		proxy: {
			"/api": "http://localhost:8000/",
		},
	},
	build: {
		manifest: true,
		rollupOptions: {
			input: "./scripts/index.js",
		},
	},
})
