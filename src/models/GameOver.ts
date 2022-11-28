import CanvasObject from "./CanvasObject";
import { Container, DisplayObject, Graphics, Text } from "pixi.js";
import config from "../config/config";

export default class GameOver extends CanvasObject<Container<DisplayObject>> {
	constructor(stage: Container<DisplayObject>, restart: () => void) {
		super(stage, new Container<DisplayObject>());

		// Create mask background
		const mask = new Graphics();
		mask.beginFill(0x00000, 0.5);
		mask.drawRect(0, 0, config.width, config.height);
		mask.zIndex = -1;

		// Create game over text element
		const gameOverText = new Text("Game over", {
			fontSize: 42,
			fill: 0xffffff,
		});
		gameOverText.anchor.set(0.5, 0.5);
		gameOverText.position.set(config.width / 2, config.height / 2);

		// Create restart text element
		const restartText = new Text("Restart", {
			fill: 0xffffff,
			fontSize: 24,
		});
		restartText.anchor.set(0.5, 0.5);
		restartText.position.set(
			gameOverText.x,
			gameOverText.y + gameOverText.height
		);

		// Add events for restart
		restartText.interactive = true;
		restartText.cursor = "pointer";
		restartText.on("click", () => {
			restart();
			this.object.removeChild(mask, gameOverText, restartText);
			this.destroyObject();
		});

		this.object.sortableChildren = true;

		this.object.addChild(mask, gameOverText, restartText);
	}
}
