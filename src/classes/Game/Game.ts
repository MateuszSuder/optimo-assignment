import { Application } from "pixi.js";
import config from "../../config/config";
import IGame from "../../inferfaces/IGame";

export default class Game implements IGame {
	private started: boolean = false;
	private points: number = 0;
	private app: Application;

	constructor() {
		const canvas = document.createElement("canvas");
		canvas.setAttribute("id", config.canvasId);

		this.app = new Application({
			view: canvas,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	start() {
		this.points = 0;
		return;
	}

	stop() {
		return;
	}
}
