import { Rectangle } from "pixi.js";

export default function hitTestRectangle(r1: Rectangle, r2: Rectangle) {
	//Define the variables we'll need to calculate
	let hit;

	//hit will determine whether there's a collision
	hit = false;

	//Find the center points of each sprite
	const centerX1 = r1.x + r1.width / 2;
	const centerY1 = r1.y + r1.height / 2;
	const centerX2 = r2.x + r2.width / 2;
	const centerY2 = r2.y + r2.height / 2;

	//Find the half-widths and half-heights of each sprite
	const halfWidth1 = r1.width / 2;
	const halfHeight1 = r1.height / 2;
	const halfWidth2 = r2.width / 2;
	const halfHeight2 = r2.height / 2;

	//Calculate the distance vector between the sprites
	const vx = centerX1 - centerX2;
	const vy = centerY1 - centerY2;

	//Figure out the combined half-widths and half-heights
	const combinedHalfWidths = halfWidth1 + halfWidth2;
	const combinedHalfHeights = halfHeight1 + halfHeight2;

	//Check for a collision on the x-axis
	if (Math.abs(vx) < combinedHalfWidths) {
		//A collision might be occurring. Check for a collision on the y-axis
		hit = Math.abs(vy) < combinedHalfHeights;
	} else {
		//There's no collision on the x-axis
		hit = false;
	}

	//`hit` will be either `true` or `false`
	return hit;
}
