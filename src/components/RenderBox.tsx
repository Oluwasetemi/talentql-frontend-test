import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAppSelector } from '../store/hooks';
import {
	CircleShape,
	OvalShape,
	RectangleShape,
	SquareShape,
	TriangleShape,
} from '../util';

export const BoxContainer = styled.div`
	width: 200px;
	height: 200px;
	background-color: white;
	display: grid;
	place-content: center;
`;

export const BoxWrapper = styled.div`
	padding-left: 5px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

export function RenderBox() {
	const selectedColors = useAppSelector((state) => state.color.selectedColors);
	const selectedShapes = useAppSelector((state) => state.shape.selectedShapes);

	const rawColorsX = useAppSelector((state) => state.color.colors);
	const rawShapesX = useAppSelector((state) => state.shape.shapes);

	// const dispatch = useAppDispatch();

	let [message, setMessage] = React.useState<string>('All Items');

	let ovalShape = () =>
		selectedShapes.includes('Oval') &&
		selectedColors.map((color) => (
			<BoxContainer key={color}>
				<OvalShape color={color} />
			</BoxContainer>
		));

	let circleShape = () =>
		selectedShapes.includes('Round') &&
		selectedColors.map((color) => (
			<BoxContainer key={color}>
				<CircleShape color={color} />
			</BoxContainer>
		));

	let triangleShape = () =>
		selectedShapes.includes('Triangle') &&
		selectedColors.map((color) => (
			<BoxContainer key={color}>
				<TriangleShape color={color} />
			</BoxContainer>
		));

	let squareShape = () =>
		selectedShapes.includes('Square') &&
		selectedColors.map((color) => (
			<BoxContainer key={color}>
				<SquareShape color={color} />
			</BoxContainer>
		));

	let rectangleShape = () =>
		selectedShapes.includes('Rectangle') &&
		selectedColors.map((color) => (
			<BoxContainer key={color}>
				<RectangleShape color={color} />
			</BoxContainer>
		));

	React.useEffect(() => {
		const allColors = rawColorsX.length === selectedColors.length;
		const allShapes = rawShapesX.length === selectedShapes.length;

		if (allColors && allShapes) {
			setMessage('All Items');
			toast(`All Items`);
		} else if (allShapes && selectedColors.length === 1) {
			const foundColor = rawColorsX.find(
				(color) => color.color === selectedColors[0],
			);
			setMessage(`All ${foundColor!.name} Items`);
			toast(`All ${foundColor!.name} Items`);
		} else if (allColors && selectedShapes.length === 1) {
			setMessage(`All ${selectedShapes[0]} Items`);
			toast(`All ${selectedShapes[0]} Items`);
		} else if (selectedShapes.length > 1 && selectedColors.length === 1) {
			const foundColor = rawColorsX.find(
				(color) => color.color === selectedColors[0],
			);
			setMessage(`Multiple ${foundColor!.name} Items`);
			toast(`All ${foundColor!.name} Items`);
		} else if (selectedColors.length > 1 && selectedShapes.length === 1) {
			setMessage(`Multiple ${selectedShapes} Items`);
			toast(`${selectedShapes} shapes selected`);
		} else if (selectedColors.length === 1 && selectedShapes.length === 1) {
			const foundColor = rawColorsX.find(
				(color) => color.color === selectedColors[0],
			);
			setMessage(`${selectedShapes[0]} ${foundColor?.name} items`);
			toast(`${selectedShapes[0]} ${foundColor!.name} Items`);
		} else if (
			(allColors && selectedShapes.length < rawShapesX.length) ||
			(allShapes && selectedColors.length < rawColorsX.length)
		) {
			setMessage('Multiple Items');
			toast(`Multiple Items`);
		}
	}, [selectedColors, selectedShapes, message]);

	return (
		<>
			<h2 data-testid="message">{message}</h2>
			<BoxWrapper>
				<>
					{ovalShape()}
					{circleShape()}
					{triangleShape()}
					{squareShape()}
					{rectangleShape()}
				</>
			</BoxWrapper>
		</>
	);
}
