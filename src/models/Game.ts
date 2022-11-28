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

		this.player = new Player(
			sheets.character.animations,
			this.stage,
			this.app.ticker
		);

		this.foodTextures = sheets.food.textures;
		this.start();
	}

	private start(): void {
		this.points = 0;
		this.ticker.start();
		this.spawnFood();
		this.stats && this.stats.destroy();
		if (this.food)
			this.stats = new Stats(
				this.player,
				this.food,
				this.ticker,
				this.stage,
				() => {
					this.food?.destroy();
					this.spawnFood();
				},
				(lives: number) => {
					if (lives === 0) {
						this.over();
					} else {
						this.food?.destroy();
						this.spawnFood();
					}
				}
			);
		return;
	}

	private restart() {
		this.start();
	}

	private over(): void {
		this.food && this.food.destroy();
		this.ticker.stop();
		new GameOver(this.stage, this.restart.bind(this));
		return;
	}

	private get foodTexture() {
		const textures = Object.keys(this.foodTextures);
		const rand = randomInt(textures.length);
		return this.foodTextures[textures[rand]];
	}

	private spawnFood() {
		this.food = new Food(
			this.foodTexture,
			this.ticker,
			this.stage,
			(this.stats?.score || 0) + 1
		);

		if (this.stats) {
			this.food && this.stats.setFood(this.food);
		}
	}

	get stage(): Container<DisplayObject> {
		return this.app.stage;
	}

	get ticker(): Ticker {
		return this.app.ticker;
	}
}
