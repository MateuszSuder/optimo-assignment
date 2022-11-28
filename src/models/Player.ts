import {
	AnimatedSprite,
	Container,
	DisplayObject,
	Texture,
	Ticker,
} from "pixi.js";
import Movable from "./InteractiveObject";
import config from "../config/config";

export default class Player extends Movable<AnimatedSprite> {
	private readonly textures: Record<string, Texture[]>;
	private animationName: "idle" | "left" | "right" = "idle";

	constructor(
		textures: Record<string, Texture[]>,
		stage: Container<DisplayObject>,
		ticker: Ticker
	) {
		super(ticker, stage, new AnimatedSprite(textures.idle));
		this.textures = textures;
		this.initPlayer();
		this.addLoop(this.update);
	}

	private initPlayer() {
		const { width, height } = config;

		this.object.scale = { x: 2, y: 2 };
		this.object.anchor.x = 0.5;
		this.object.anchor.y = 1;
		this.object.y = height;
		this.object.x = width / 2;
		this.handleMovement();
		this.object.play();

		this.addHandler("left", (isDown) => {
			this.animationName = isDown ? "left" : "idle";
			this.handleMovement();
		});

		this.addHandler("right", (isDown) => {
			this.animationName = isDown ? "right" : "idle";
			this.handleMovement();
		});
	}

	private handleMovement() {
		if (this.animationName === "idle") {
			this.object.animationSpeed = 0.05;
			this.velocity = 0;
		} else {
			if (this.animationName === "left") {
				if (this.object.x - this.object.width / 4 <= 0) {
					this.velocity = 0;
				} else {
					this.velocity = -config.playerSpeed;
				}
			} else {
				if (this.object.x + this.object.width / 4 >= config.width) {
					this.velocity = 0;
				} else {
					this.velocity = config.playerSpeed;
				}
			}
			this.object.animationSpeed = 0.25;
		}

		if (this.object.textures !== this.textures[this.animationName])
			this.object.textures = this.textures[this.animationName];

		this.object.play();
	}

	private update(delta: number) {
		this.object.x = this.object.x + this.velocity * delta;
	}

	public getBounds() {
		return this.object.getBounds();
	}
}
