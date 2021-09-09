import React from 'react';
import { Circle, Ellipse, Rectangle, Triangle } from 'react-shapes';

export function isChecked(value: string, from: Array<unknown>) {
	return from.includes(value);
}

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
