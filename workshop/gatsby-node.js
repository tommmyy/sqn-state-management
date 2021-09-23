const { keys, replace, filter, map, compose, test } = require('ramda');
const fs = require('fs-extra');

const { dependencies } = require('./package.json');

const toPascalCase = string =>
	string
		.split('/')
		.map(snake =>
			snake
				.split('-')
				.map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
				.join('')
		)
		.join('/');

const pages = compose(
	map(page => {
		const slug = replace(/@workshop\//, '', page);
		const component = toPascalCase(slug);
		return {
			page,
			component,
			slug,
		};
	}),
	filter(test(/^\@workshop\/(exercise|solution)/)),
	keys
)(dependencies);

exports.createPages = async ({ actions }) => {
	const { createPage } = actions;

	pages.forEach(({ slug, page }) => {
		const exercise = require.resolve('./src/templates/Exercise.js');

		createPage({
			path: slug,
			component: exercise,
			context: {
				slug,
				page,
			},
		});
	});

	return null;
};

exports.onCreatePage = ({ page, actions }) => {
	const { createPage, deletePage } = actions;

	deletePage(page);
	createPage({
		...page,
		context: {
			...page.context,
			pages,
		},
	});
};

exports.onPreBootstrap = ({ reporter }) => {
	reporter.info('Bootstraping the `exercises.js` file.');

	const content = `/* IMPORTANT: The file is generated. */
	import { lazy } from 'react';

	export default {
	${pages
		.map(({ page, slug }) => `\t\t'${slug}': lazy(() => import('${page}')),`)
		.join('\n')}
	};`;

	// const content = `/* IMPORTANT: The file is generated. */
	// ${pages
	// .map(({ page, component }) => `import ${component} from '${page}';`)
	// .join('\n')}

	// export default {
	// ${pages.map(({ slug, component }) => `\t'${slug}': ${component},`).join('\n')}
	// };`;

	fs.writeFileSync('./src/exercises.js', content, 'utf8');
};
