import AnimatedObject from "./AnimatedObject";
import { Container, DisplayObject, Sprite, Texture, Ticker } from "pixi.js";

export default class Food extends AnimatedObject<Sprite> {
	constructor(
		texture: Texture,
		ticker: Ticker,
		stage: Container<DisplayObject>
	) {
		super(ticker, stage, new Sprite(texture));
	}
}
