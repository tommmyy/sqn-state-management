/**
 * The config is made toe be suitable for the Workshop application:
 * - we allow to use console statements
 * - we allow to use have unused variables as there is files which serves
 *   as starting point for the further solution.
 * - we allow missing prop-types
 */
module.exports = {
	root: true,
	extends: ['lundegaard'],
	rules: {
		'no-console': 'warn',
		'import/order': ['error', { 'newlines-between': 'always' }],
		'sort-imports': [
			'error',
			{
				ignoreCase: false,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			},
		],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: ['src/**/*.test.js', '*.config.js', 'tools/*.js'],
			},
		],
	},
	overrides: [
		{
			files: ['**/exercises/**/*.js', '**/solutions/**/*.js'],
			rules: {
				'no-unused-vars': 'warn',
				'react/prop-types': 'off',
			},
		},
	],
};
