import {
	Application,
	Container,
	DisplayObject,
	Resource,
	Spritesheet,
	Texture,
	Ticker,
} from "pixi.js";
import config from "../config/config";
import IGame from "../inferfaces/IGame";
import GameSheets from "../types/GameSheets";
import Player from "./Player";
import randomInt from "../utils/randomInt";
import Food from "./Food";
import Stats from "./Stats";
import GameOver from "./GameOver";

export default class Game implements IGame {
	private readonly foodTextures: Spritesheet["textures"];
	private readonly player: Player;
	private food?: Food;
	private stats?: Stats;
	private points: number = 0;
	private app: Application;

	constructor(sheets: GameSheets) {
		const { canvasId, width, height } = config;
		// Create pixi container
		const container = document.createElement("div");
		container.setAttribute("id", "pixi-content");

		// Create canvas
		const canvas = document.createElement("canvas");
		canvas.setAttribute("id", canvasId);

		// Append canvas to container
		container.appendChild(canvas);

		// Add container to document
		document.body.appendChild(container);

		// Create pixi app
		this.app = new Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			width,
			height,
			backgroundColor: "#a98274",
		});

		// Create new player object
		this.player = new Player(
			sheets.character.animations,
			this.stage,
			this.app.ticker
		);

		// Attach food textures to object
		this.foodTextures = sheets.food.textures;

		// Start game
		this.start();
	}

	/**
	 * Starts game
	 * @private
	 */
	private start(): void {
		// Start ticker
		this.ticker.start();
		this.spawnFood();

		// Destroy stats if available
		this.stats && this.stats.destroy();

		// Create new stats object
		if (this.food)
			this.stats = new Stats(
				this.player,
				this.food,
				this.ticker,
				this.stage,
				() => {
					// On catch clear element from screen then spawn next one
					this.food?.destroy();
					this.spawnFood();
				},
				(lives: number) => {
					if (lives === 0) {
						this.over();
					} else {
						// On miss clear element from screen then spawn next one
						this.food?.destroy();
						this.spawnFood();
					}
				}
			);
		return;
	}

	/**
	 * @see start
	 * @private
	 */
	private restart(): void {
		this.start();
	}

	/**
	 * Function to end the game
	 * @private
	 */
	private over(): void {
		// Destroy leftover food elements
		this.food && this.food.destroy();

		// Stop the ticker
		this.ticker.stop();

		// Show game over screen
		new GameOver(this.stage, this.restart.bind(this));
		return;
	}

	/**
	 * Get random food texture
	 * @private
	 */
	private get foodTexture(): Texture<Resource> {
		const textures = Object.keys(this.foodTextures);
		const rand = randomInt(textures.length);
		return this.foodTextures[textures[rand]];
	}

	/**
	 * Creates new food object
	 * @private
	 */
	private spawnFood() {
		// Create new food element
		this.food = new Food(
			this.foodTexture,
			this.ticker,
			this.stage,
			(this.stats?.score || 0) + 1
		);

		// If food created attach it to stats element
		if (this.stats) {
			this.food && this.stats.setFood(this.food);
		}
	}

	/**
	 * @return {@link Application.stage}
	 */
	get stage(): Container<DisplayObject> {
		return this.app.stage;
	}

	/**
	 * @return {@link Ticker}
	 */
	get ticker(): Ticker {
		return this.app.ticker;
	}
}
