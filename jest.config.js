const ignorePatterns = [
	'/.cache/',
	'/.history/',
	'/node_modules/',
	'/es/',
	'/dist/',
	'/lib/',
];
module.exports = {
	globals: {
		__PATH_PREFIX__: '',
	},
	modulePathIgnorePatterns: ['.cache'],
	testPathIgnorePatterns: ignorePatterns,
	coveragePathIgnorePatterns: ignorePatterns,
	transformIgnorePatterns: ['/node_modules/(?!(gatsby)|ramda).+\\.js$'],
};
