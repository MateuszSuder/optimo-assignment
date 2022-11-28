import AnimatedObject from "./AnimatedObject";
import { Container, DisplayObject, Sprite, Texture, Ticker } from "pixi.js";
import randomInt from "../utils/randomInt";
import config from "../config/config";

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

	private gameLoop(delta: number) {
		this.object.rotation = this.object.rotation + Math.PI / 180;
		this.object.y +=
			Math.min(Math.max(2 + Math.pow(1.05, this.difficulty), 3), 5) *
			delta;
	}

	private animateObject() {
		this.addLoop(this.gameLoop);
	}

	public getBounds() {
		return this.object.getBounds();
	}

	public destroy() {
		this.object.destroy();
		this.removeLoop(this.gameLoop);
	}
}
