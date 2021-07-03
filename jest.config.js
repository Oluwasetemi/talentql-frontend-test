module.exports = {
	preset: 'ts-jest',
	// testEnvironment: 'js-dom',
	transform: {
		'^.+\\.svg$': '<rootDir>/svg-transform.js',
	},
	testEnvironment: 'jest-environment-jsdom-sixteen',
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
};
