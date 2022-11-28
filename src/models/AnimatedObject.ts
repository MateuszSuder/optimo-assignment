import {
	AnimatedSprite,
	Container,
	DisplayObject,
	Sprite,
	Ticker,
} from "pixi.js";
import CanvasObject from "./CanvasObject";

/**
 * Abstract class to create objects which use ticker
 */
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

	/**
	 * Method to add new event loop
	 * @param fn function to be added to loop
	 * @protected
	 */
	protected addLoop(fn: (delta: number) => void): Ticker {
		return this.ticker.add(fn, this);
	}

	/**
	 * Method to remove function from loop
	 * @param fn function to remove
	 * @protected
	 */
	protected removeLoop(fn: (delta: number) => void): Ticker {
		return this.ticker.remove(fn, this);
	}
}
