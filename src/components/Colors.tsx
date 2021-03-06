import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { checkColor, resetColors, unCheckColor } from '../store/color';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { isChecked } from '../util';

export const ColorContainer = styled.div`
	/* height: 50px; */
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
`;
export const ColorItem = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	position: relative;
	background-color: ${(prop) => prop.color};
	border: 1px solid transparent;

	input[type='checkbox'] {
		visibility: hidden;
	}

	label {
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 50%;
		cursor: pointer;
		height: 50px;
		left: 0;
		position: absolute;
		top: 0;
		width: 50px;
	}

	input[type='checkbox']:checked + label {
		box-shadow: 0 0 5px rgba(81, 203, 238, 1);
		border: 1px solid rgba(81, 203, 238, 1);
	}

	input[type='checkbox']:checked + label:after {
		opacity: 1;
	}
`;

export function ColorsFilter() {
	const colors = useAppSelector((state) => state.color.colors).map(
		(color) => color.color,
	);
	const selectedColors = useAppSelector((state) => state.color.selectedColors);

	const dispatch = useAppDispatch();

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		// eslint-disable-next-line no-unused-expressions
		if (isChecked(name, selectedColors)) {
			dispatch(unCheckColor(name));
			if (!('Cypress' in window)) {
				toast(`${name} color unchecked`);
			}
		} else {
			dispatch(checkColor(name));
			if (!('Cypress' in window)) {
				toast(`${name} color checked`);
			}
		}
	};

	React.useEffect(() => {
		if (selectedColors.length === 1) {
			let current = document.querySelector('div.current') as HTMLElement;
			current.addEventListener(
				'click',
				() => {
					setTimeout(() => {
						dispatch(resetColors());
					}, 0);
				},
				{ once: true },
			);
		}
	}, [selectedColors]);

	return (
		<ColorContainer>
			{colors.map((color, index) => (
				<ColorItem
					key={index}
					className={isChecked(color, selectedColors) ? 'current' : ''}
					color={color}
					data-testid={color}
				>
					<input
						data-testid="color-checkbox"
						type="checkbox"
						name={color}
						id={color}
						checked={isChecked(color, selectedColors)}
						onChange={handleOnChange}
					/>
					<label htmlFor={color} style={{ backgroundColor: `${color}` }} />
				</ColorItem>
			))}
		</ColorContainer>
	);
}
