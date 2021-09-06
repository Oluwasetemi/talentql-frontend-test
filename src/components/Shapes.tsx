import { useToasts } from '@keystone-ui/toast';
import * as React from 'react';
import { Circle, Ellipse, Rectangle, Triangle } from 'react-shapes';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkShape, resetShapes, unCheckShape } from '../store/shape';

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

export function SquareShape({ color }: { color: string }) {
	return <Rectangle width={100} height={100} fill={{ color: color }} />;
}

export function RectangleShape({ color }: { color: string }) {
	return <Rectangle width={100} height={70} fill={{ color: color }} />;
}

export function CircleShape({ color }: { color: string }) {
	return <Circle r={50} fill={{ color: color }} />;
}

export function TriangleShape({ color }: { color: string }) {
	return <Triangle width={80} height={100} fill={{ color: color }} />;
}

export function OvalShape({ color }: { color: string }) {
	return <Ellipse rx={50} ry={70} fill={{ color: color }} />;
}

export function ShapesFilter() {
	const { addToast } = useToasts();
	const shapes = useAppSelector((state) => state.shape.shapes);
	const selectedShape = useAppSelector((state) => state.shape.selectedShapes);
	const dispatch = useAppDispatch();

	function isChecked(shape: string) {
		return selectedShape.includes(shape);
	}

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;

		// eslint-disable-next-line no-unused-expressions
		if (isChecked(name)) {
			dispatch(unCheckShape(name));
			if (!('Cypress' in window)) {
				addToast({ title: `${name} shape unchecked`, tone: 'positive' });
			}
		} else {
			dispatch(checkShape(name));
			if (!('Cypress' in window)) {
				addToast({ title: `${name} shape unchecked`, tone: 'positive' });
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
					className={isChecked(shape) ? 'current' : ''}
					key={index}
				>
					<input
						data-testid="shape-checkbox"
						type="checkbox"
						name={shape}
						id={shape}
						checked={isChecked(shape)}
						onChange={handleOnChange}
					/>
					<label htmlFor={shape}>{shape}</label>
				</SingleShapeButton>
			))}
		</ShapesContainer>
	);
}
