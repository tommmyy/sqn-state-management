import React, { forwardRef, useEffect, useRef } from 'react';
import { Button as ThemeButton } from 'theme-ui';

const useButton = (props, ref) => {
	// do something with ref
	useEffect(() => ref?.current?.focus(), []);

	return props;
};

// TODO:
const useMergeRefs = (a, b) => a;

const Button = forwardRef((props, externalRef) => {
	const ref = useRef();
	const buttonProps = useButton(props, ref);
	const { children } = props;

	const mergedRef = useMergeRefs(externalRef, ref);

	return (
		<ThemeButton ref={mergedRef} {...buttonProps}>
			{children}
		</ThemeButton>
	);
});
Button.displayName = 'Button';

const Demo = () => (
	<Button
		ref={ref => {
			console.log(ref);
		}}
	>
		Victim button
	</Button>
);

export default Demo;
