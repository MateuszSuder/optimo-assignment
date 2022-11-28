import AnimatedObject from "./AnimatedObject";
import { Container, DisplayObject, Sprite, Texture, Ticker } from "pixi.js";
import randomInt from "../utils/randomInt";
import config from "../config/config";

export default class Food extends AnimatedObject<Sprite> {
	constructor(
		texture: Texture,
		ticker: Ticker,
		stage: Container<DisplayObject>
	) {
		super(ticker, stage, new Sprite(texture));

		this.object.scale.set(1.5);
		this.object.anchor.set(0.5);
		this.object.x = randomInt(config.width - this.object.width);
		this.object.y = this.object.height / 2;

		this.animateObject();
	}

	private gameLoop(delta: number) {
		this.object.rotation = this.object.rotation + Math.PI / 180;
		this.object.y += 5 * delta;
	}

	private animateObject() {
		this.addLoop(this.gameLoop);
	}

	public getBounds() {
		return this.object.getBounds();
	}

	public destroy() {
		this.removeLoop(this.gameLoop);
		this.object.destroy();
	}
}
