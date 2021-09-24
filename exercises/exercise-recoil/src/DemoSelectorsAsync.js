// přidáme přepočet kalorií
// new atom - unitAtom
// totalEnergyState

import React from 'react';
import { Box, Button, Flex, Input, Label, Select } from 'theme-ui';
import { RecoilRoot, atom, selector, useRecoilState } from 'recoil';

const ENERGY_PER_COOKIE_CAL = 400;
const CAL_to_J = 4.184;

const cookiesState = atom({ key: 'cookies', default: 0 });

const unitState = atom({ key: 'unit', default: 'j' });

// TODO:
const totalEnergyState = selector({
	key: 'totalEnergyState',
	get: ({ get }) => {
		const cookies = get(cookiesState);
		const unit = get(unitState);

		return cookies * ENERGY_PER_COOKIE_CAL * (unit === 'j' ? CAL_to_J : 1);
	},
	set: ({ get, set }, value) => {
		const unit = get(unitState);

		set(
			cookiesState,
			parseInt(value) / ENERGY_PER_COOKIE_CAL / (unit === 'j' ? CAL_to_J : 1)
		);
	},
});

const Cookie = ({ sx, ...rest }) => (
	<Box
		ass="span"
		sx={{
			fontSize: 'min(12vw, 100px)',
			...sx,
		}}
		{...rest}
	>
		🍪
	</Box>
);

const CookieController = () => {
	const [cookies, setCookies] = useRecoilState(cookiesState);
	const [unit, setUnit] = useRecoilState(unitState);
	const [totalEnergy, setTotalEnergy] = useRecoilState(totalEnergyState);

	return (
		<Box>
			<Label htmlFor="totalEnergy">Total energy:</Label>
			<Input
				id="totalEnergy"
				type="number"
				min="0"
				value={totalEnergy}
				onChange={event => setTotalEnergy(event.target.value)}
			/>
			<Label htmlFor="unit">Pick a unit:</Label>

			<Select value={unit} onChange={event => setUnit(event.target.value)}>
				<option value="j">J</option>
				<option value="cal">cal</option>
			</Select>

			<Button sx={{ my: 2 }} onClick={() => setCookies(cookies + 1)}>
				Gimme Cookie!
			</Button>
		</Box>
	);
};

const CookieJar = () => {
	const [cookies] = useRecoilState(cookiesState);

	return (
		<Flex sx={{ flexWrap: 'wrap', lineHeight: 1 }}>
			{Array(Math.floor(cookies))
				.fill()
				.map((_, i) => (
					<Cookie key={i} />
				))}
		</Flex>
	);
};

const Demo = () => (
	<RecoilRoot>
		<Flex
			sx={{ flexDirection: 'column', gap: 'size-100', alignItems: 'center' }}
		>
			<CookieController />

			<CookieJar />
		</Flex>
	</RecoilRoot>
);
export default Demo;
