import {
	AnimatedSprite,
	Container,
	DisplayObject,
	Sprite,
	Ticker,
} from "pixi.js";

export default abstract class AnimatedObject<
	T extends Sprite | AnimatedSprite
> {
	private ticker: Ticker;
	private stage: Container<DisplayObject>;
	protected object: T;

	protected constructor(
		ticker: Ticker,
		stage: Container<DisplayObject>,
		object: T
	) {
		this.ticker = ticker;
		this.stage = stage;
		this.object = object;
		this.stage.addChild(this.object);
	}

	protected addLoop(fn: (delta: number) => void): Ticker {
		return this.ticker.add(fn, this);
	}
}
