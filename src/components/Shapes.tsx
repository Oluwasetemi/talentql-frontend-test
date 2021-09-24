import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkShape, resetShapes, unCheckShape } from '../store/shape';
import { isChecked } from '../util';

export const ShapesContainer = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
`;

export const SingleShapeButton = styled.button`
	/* width: 80px; */
	/* height: 30px; */
	padding: 5px 10px;
	border-radius: 15px;
	border: 1px solid grey;
	flex-direction: column;
	justify-items: center;
	position: relative;
	width: 133px;

	:hover {
		box-shadow: 0 0 6px rgba(81, 203, 238, 1);
		background-color: #81a8f9;
	}

	input[type='checkbox'] {
		visibility: hidden;
		width: 0;
		height: 100%;
	}

	label {
		background-color: transparent;
		border: 1px solid #ccc;
		cursor: pointer;
		padding: 5px 10px;

		/* height: 50px; */
		left: 0;
		position: absolute;
		top: 0;
		width: 110px;
		border-radius: 15px;
	}

	input[type='checkbox']:checked + label {
		box-shadow: 0 0 5px rgba(81, 203, 238, 1);
		border: 1px solid rgba(81, 203, 238, 1);
	}

	input[type='checkbox']:checked + label:after {
		opacity: 1;
	}
`;

export function ShapesFilter() {
	const shapes = useAppSelector((state) => state.shape.shapes);
	const selectedShape = useAppSelector((state) => state.shape.selectedShapes);
	const dispatch = useAppDispatch();

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;

		// eslint-disable-next-line no-unused-expressions
		if (isChecked(name, selectedShape)) {
			dispatch(unCheckShape(name));
			if (!('Cypress' in window)) {
				toast(`${name} shape unchecked`);
			}
		} else {
			dispatch(checkShape(name));
			if (!('Cypress' in window)) {
				toast(`${name} shape unchecked`);
			}
		}
	};

	React.useEffect(() => {
		if (selectedShape.length === 1) {
			let current = document.querySelector('button.current') as HTMLElement;

			current?.addEventListener(
				'click',
				() => {
					setTimeout(() => {
						dispatch(resetShapes());
					}, 0);
				},
				{ once: true },
			);
		}
	}, [selectedShape]);

	return (
		<ShapesContainer className="shapes">
			{shapes.map((shape, index) => (
				<SingleShapeButton
					className={isChecked(shape, selectedShape) ? 'current' : ''}
					key={index}
				>
					<input
						data-testid="shape-checkbox"
						type="checkbox"
						name={shape}
						id={shape}
						checked={isChecked(shape, selectedShape)}
						onChange={handleOnChange}
					/>
					<label htmlFor={shape}>{shape}</label>
				</SingleShapeButton>
			))}
		</ShapesContainer>
	);
}
