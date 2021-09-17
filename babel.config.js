/**
 * Important! This babel config is used for IDE configuration.
 *
 * This is NOT meant to be used for building the app.
 */
module.exports = api => {
	api.cache.using(() => process.env.NODE_ENV);

	return {
		presets: ['babel-preset-react-union'],
	};
};
