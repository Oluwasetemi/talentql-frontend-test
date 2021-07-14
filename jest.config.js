module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	// testEnvironment: 'js-dom',
	collectCoverageFrom: ['handlers/**/*.ts', 'src/*'],
	coveragePathIgnorePatterns: ['<rootDir>/node_modules', 'src/filter.json'],
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
		'.ts': '<rootDir>/node_modules/ts-jest/preprocessor.js',
	},
	testEnvironment: 'jest-environment-jsdom-sixteen',
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
};
