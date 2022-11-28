import {
	AnimatedSprite,
	Container,
	DisplayObject,
	Sprite,
	Ticker,
} from "pixi.js";
import CanvasObject from "./CanvasObject";

export default abstract class AnimatedObject<
	T extends Sprite | AnimatedSprite
> extends CanvasObject<T> {
	private ticker: Ticker;

	protected constructor(
		ticker: Ticker,
		stage: Container<DisplayObject>,
		object: T
	) {
		super(stage, object);
		this.ticker = ticker;
	}

	protected addLoop(fn: (delta: number) => void): Ticker {
		return this.ticker.add(fn, this);
	}

	protected removeLoop(fn: (delta: number) => void): Ticker {
		return this.ticker.remove(fn, this);
	}
}
