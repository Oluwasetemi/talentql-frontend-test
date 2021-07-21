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
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	transform: {
		'^.+\\.svg$': '<rootDir>/svg-transform.js',
		'\\.[jt]sx?$': 'babel-jest',
	},
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
	setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts'],
};
