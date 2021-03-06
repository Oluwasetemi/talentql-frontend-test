module.exports = {
	testEnvironment: 'jsdom',
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules',
		'src/filter.json',
		'vite-env.d.ts',
		'cypress',
	],
	coverageReporters: ['json', 'text', 'lcov', 'clover'],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 80,
			lines: 90,
			statements: 90,
		},
	},
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.svg$': '<rootDir>/svg-transform.js',
		'\\.[jt]sx?$': 'babel-jest',
	},
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
	setupFilesAfterEnv: [
		'<rootDir>/test/setup-env.ts',
		'<rootDir>/test/matchMedia.mock.js',
	],
};
