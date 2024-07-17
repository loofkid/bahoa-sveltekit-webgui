import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5174,
		strictPort: false,
		host: '0.0.0.0',
		cors: true,
	},
	preview: {
		port: 5174,
		strictPort: false,
		host: '0.0.0.0',
		cors: true,
	},
});
