import {
	AnimatedSprite,
	Container,
	DisplayObject,
	Texture,
	Ticker,
} from "pixi.js";
import Movable from "../Movable/Movable";
import config from "../../config/config";

export default class Player extends Movable {
	private readonly player: AnimatedSprite;
	private readonly textures: Record<string, Texture[]>;
	private animationName: "idle" | "left" | "right" = "idle";

	constructor(
		textures: Record<string, Texture[]>,
		stage: Container<DisplayObject>,
		ticker: Ticker
	) {
		super({
			leftHandler: (isDown) => {
				if (isDown) {
					this.animationName = "left";
				} else {
					this.animationName = "idle";
				}
				this.handleMovement();
			},
			rightHandler: (isDown) => {
				if (isDown) {
					this.animationName = "right";
				} else {
					this.animationName = "idle";
				}
				this.handleMovement();
			},
		});

		const { width, height } = config;

		this.textures = textures;
		this.player = new AnimatedSprite(textures.idle);
		this.player.scale = { x: 2, y: 2 };
		this.player.anchor.x = 0.5;
		this.player.anchor.y = 1;
		this.player.y = height;
		this.player.x = width / 2;
		this.handleMovement();
		stage.addChild(this.player);
		this.player.play();
		ticker.add(this.update, this);
	}

	private handleMovement() {
		if (this.animationName === "idle") {
			this.player.animationSpeed = 0.05;
			this.velocity = 0;
		} else {
			if (this.animationName === "left") {
				if (this.player.x <= 0) {
					this.velocity = 0;
				} else {
					this.velocity = -config.playerSpeed;
				}
			} else {
				if (this.player.x >= window.innerWidth) {
					this.velocity = 0;
				} else {
					this.velocity = config.playerSpeed;
				}
			}
			this.player.animationSpeed = 0.25;
		}

		if (this.player.textures !== this.textures[this.animationName])
			this.player.textures = this.textures[this.animationName];

		this.player.play();
	}

	private update(delta: number) {
		this.player.x = this.player.x + this.velocity * delta;
	}
}
