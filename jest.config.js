module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	// testEnvironment: 'js-dom',
	collectCoverageFrom: ['**/*.ts', '!src/__tests__', '**/*.{ts,tsx}'],
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules',
		'src/filter.json',
		'vite-env.d.ts',
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
		'.ts|tsx': '<rootDir>/node_modules/ts-jest/preprocessor.js',
	},
	testEnvironment: 'jest-environment-jsdom-sixteen',
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
};
