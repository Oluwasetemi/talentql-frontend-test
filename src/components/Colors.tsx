import { useToasts } from '@keystone-ui/toast';
import React from 'react';
import styled from 'styled-components';
import { checkColor, resetColors, unCheckColor } from '../store/color';
import { useAppDispatch, useAppSelector } from '../store/hooks';

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
	const { addToast } = useToasts();
	const colors = useAppSelector((state) => state.color.colors).map(
		(color) => color.color,
	);
	const selectedColors = useAppSelector((state) => state.color.selectedColors);

	const dispatch = useAppDispatch();

	function isChecked(color: string) {
		return selectedColors.includes(color);
	}

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		// eslint-disable-next-line no-unused-expressions
		if (isChecked(name)) {
			dispatch(unCheckColor(name));
			addToast({ title: `${name} color unchecked`, tone: 'positive' });
		} else {
			dispatch(checkColor(name));
			addToast({ title: `${name} color checked`, tone: 'negative' });
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
					className={isChecked(color) ? 'current' : ''}
					color={color}
					data-testid={color}
				>
					<input
						data-testid="color-checkbox"
						type="checkbox"
						name={color}
						id={color}
						checked={isChecked(color)}
						onChange={handleOnChange}
					/>
					<label htmlFor={color} style={{ backgroundColor: `${color}` }} />
				</ColorItem>
			))}
		</ColorContainer>
	);
}
