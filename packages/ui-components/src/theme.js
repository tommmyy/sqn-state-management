import { tailwind } from '@theme-ui/presets';

const gutters = [2, 3, 4];

const theme = {
	...tailwind, //
	// buttons: {
	// 	...system.buttons,
	// 	secondary: {
	// 		color: 'background',
	// 		bg: 'secondary',
	// 	},
	// },
	grid: {
		container: {
			px: gutters,
		},
		gutters,
		maxColumns: 12,
	},
};
console.log(theme);
export default theme;
