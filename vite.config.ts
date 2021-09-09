/* eslint-disable import/no-extraneous-dependencies */
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	server: {
		port: 7779,
	},
	esbuild: {
		jsxFactory: '_jsx',
		jsxFragment: '_jsxFragment',
		jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from 'react'`,
	},
});
