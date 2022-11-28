import {
	Application,
	Container,
	DisplayObject,
	Spritesheet,
	Ticker,
} from "pixi.js";
import config from "../config/config";
import IGame from "../inferfaces/IGame";
import GameSheets from "../types/GameSheets";
import Player from "./Player";
import randomInt from "../utils/randomInt";
import Food from "./Food";
import Stats from "./Stats";

export default class Game implements IGame {
	private readonly foodTextures: Spritesheet["textures"];
	private player: Player;
	private food?: Food;
	private stats?: Stats;
	private started: boolean = false;
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

		this.player = new Player(
			sheets.character.animations,
			this.stage,
			this.app.ticker
		);

		this.foodTextures = sheets.food.textures;
		this.start();
	}

	start(): void {
		this.points = 0;
		this.spawnFood();
		if (this.food)
			this.stats = new Stats(
				this.player,
				this.food,
				this.ticker,
				this.stage,
				() => {
					console.log("catch");
				},
				() => {
					this.food?.destroy();
					this.spawnFood();

					if (this.stats) {
						this.food && this.stats.setFood(this.food);
						this.player && this.stats.setPlayer(this.player);
					}
				}
			);
		return;
	}

	/**
	 * Resets game to initial state
	 * @private
	 */
	private reset(): void {}

	stop(): void {
		return;
	}

	private get foodTexture() {
		const textures = Object.keys(this.foodTextures);
		const rand = randomInt(textures.length);
		return this.foodTextures[textures[rand]];
	}

	private spawnFood() {
		this.food = new Food(this.foodTexture, this.ticker, this.stage);
	}

	get stage(): Container<DisplayObject> {
		return this.app.stage;
	}

	get ticker(): Ticker {
		return this.app.ticker;
	}
}
