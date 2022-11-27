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

	private handleKey(
		event: KeyboardEvent,
		keyCode: typeof keys[keyof typeof keys],
		callback: Handler
	) {
		if (event.code === keyCode) {
			callback(event.type === "keydown");
		}
	}

	protected addHandler(key: keyof typeof keys, handler: Handler) {
		const k = keys[key];
		document.addEventListener("keydown", (e) =>
			this.handleKey(e, k, handler)
		);
		document.addEventListener("keyup", (e) =>
			this.handleKey(e, k, handler)
		);
	}
}
