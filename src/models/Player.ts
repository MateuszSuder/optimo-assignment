import {
	AnimatedSprite,
	Container,
	DisplayObject,
	Rectangle,
	Texture,
	Ticker,
} from "pixi.js";
import Movable from "./InteractiveObject";
import config from "../config/config";

/**
 * Class used for creating player object
 */
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

	/**
	 * Initiates player element
	 * @private
	 */
	private initPlayer(): void {
		const { width, height } = config;

		this.object.scale = { x: 2, y: 2 };
		this.object.anchor.x = 0.5;
		this.object.anchor.y = 1;
		this.object.y = height;
		this.object.x = width / 2;
		this.handleMovement();
		this.object.play();

		// Add handlers for movement
		this.addHandler("left", (isDown) => {
			this.animationName = isDown ? "left" : "idle";
			this.handleMovement();
		});

		this.addHandler("right", (isDown) => {
			this.animationName = isDown ? "right" : "idle";
			this.handleMovement();
		});
	}

	/**
	 * Function which handles movement depending on current animation
	 * @private
	 */
	private handleMovement(): void {
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

		// Replace textures if designed are different from current
		if (this.object.textures !== this.textures[this.animationName])
			this.object.textures = this.textures[this.animationName];

		// Play animation
		this.object.play();
	}

	/**
	 * Event loop to update player position
	 * @param {@link PIXI.Ticker#deltaTime} delta
	 * @private
	 */
	private update(delta: number): void {
		this.object.x = this.object.x + this.velocity * delta;
	}

	/**
	 * Returns player bounds
	 * @return {@link Rectangle}
	 */
	public getBounds(): Rectangle {
		return this.object.getBounds();
	}
}
