module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	// testEnvironment: 'js-dom',
	transform: {
		'^.+\\.svg$': '<rootDir>/svg-transform.js',
		'^.+\\.tsx?$': 'ts-jest',
	},
	testEnvironment: 'jest-environment-jsdom-sixteen',
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
};
