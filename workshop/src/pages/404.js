import PropTypes from 'prop-types';

import * as types from '../types';

const ErrorPage = () => 'Not found';

ErrorPage.propTypes = {
	pageContext: PropTypes.shape({
		pages: PropTypes.arrayOf(types.Page),
	}),
};

export default ErrorPage;
