import AnimatedObject from "./AnimatedObject";
import {
	Container,
	DisplayObject,
	Rectangle,
	Sprite,
	Texture,
	Ticker,
} from "pixi.js";
import randomInt from "../utils/randomInt";
import config from "../config/config";

/**
 * Class used to create food element
 */
export default class Food extends AnimatedObject<Sprite> {
	private readonly difficulty: number = 1;

	constructor(
		texture: Texture,
		ticker: Ticker,
		stage: Container<DisplayObject>,
		difficulty: number
	) {
		super(ticker, stage, new Sprite(texture));

		this.difficulty = difficulty;

		this.object.scale.set(1.5);
		this.object.anchor.set(0.5);
		this.object.x = randomInt(config.width - this.object.width);
		this.object.y = this.object.height / 2;

		this.animateObject();
	}

	/**
	 * Game loop used to animate food object
	 * @param {@link PIXI.Ticker#deltaTime} delta
	 * @private
	 */
	private gameLoop(delta: number): void {
		this.object.rotation = this.object.rotation + Math.PI / 180;
		this.object.y +=
			Math.min(Math.max(2 + Math.pow(1.05, this.difficulty), 3), 5) *
			delta;
	}

	/**
	 * Function to start animation
	 * @private
	 */
	private animateObject(): void {
		this.addLoop(this.gameLoop);
	}

	/**
	 * Returns object boundaries in rectangular shape
	 * @return {@link Rectangle}
	 */
	public getBounds(): Rectangle {
		return this.object.getBounds();
	}

	/**
	 * Destroys element
	 */
	public destroy(): void {
		this.object.destroy();
		this.removeLoop(this.gameLoop);
	}
}
