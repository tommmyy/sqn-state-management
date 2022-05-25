import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Avatar = forwardRef(({ style, size = 20, ...rest }, ref) => (
	<div
		ref={ref}
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '1000px',
			height: `${size}px`,
			width: `${size}px`,
			backgroundColor: '#aabafa',
			color: '#333333',
			fontWeight: 'bold',
			...style,
		}}
		{...rest}
	/>
));

Avatar.displayName = 'Avatar';

export default Avatar;
