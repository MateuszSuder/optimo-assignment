import { Application, Container, DisplayObject } from "pixi.js";
import config from "../../config/config";
import IGame from "../../inferfaces/IGame";
import GameSheets from "../../types/GameSheets";
import Player from "../Player/Player";

export default class Game implements IGame {
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

		new Player(sheets.character.animations, this.stage, this.app.ticker);
	}

	/**
	 * Resets game to initial state
	 * @private
	 */
	private reset(): void {}

	start(): void {
		this.points = 0;
		return;
	}

	stop(): void {
		return;
	}

	get stage(): Container<DisplayObject> {
		return this.app.stage;
	}
}
