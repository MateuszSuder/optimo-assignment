import AnimatedObject from "./AnimatedObject";
import {
	AnimatedSprite,
	Container,
	DisplayObject,
	Sprite,
	Ticker,
} from "pixi.js";

export const keys = {
	left: "ArrowLeft",
	right: "ArrowRight",
} as const;

type Handler = (isDown: boolean) => void;

/**
 * Class for creating objects that use keyboard events
 */
export default abstract class InteractiveObject<
	T extends Sprite | AnimatedSprite
> extends AnimatedObject<T> {
	protected velocity: number = 0;

	protected constructor(
		ticker: Ticker,
		stage: Container<DisplayObject>,
		object: T
	) {
		super(ticker, stage, object);
	}

	/**
	 * Method for handling keyboard elements
	 * @param {KeyboardEvent} event event
	 * @param keyCode code of key which we want to listen to
	 * @param callback callback function which will be executed after event occurs
	 * @private
	 */
	private handleKey(
		event: KeyboardEvent,
		keyCode: typeof keys[keyof typeof keys],
		callback: Handler
	): void {
		if (event.code === keyCode) {
			callback(event.type === "keydown");
		}
	}

	/**
	 * Add handler for key
	 * @param key key to be handled
	 * @param handler function which will be executed after event occurs
	 * @protected
	 */
	protected addHandler(key: keyof typeof keys, handler: Handler): void {
		const k = keys[key];
		document.addEventListener("keydown", (e) =>
			this.handleKey(e, k, handler)
		);
		document.addEventListener("keyup", (e) =>
			this.handleKey(e, k, handler)
		);
	}
}
