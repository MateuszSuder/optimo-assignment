import { Container, DisplayObject } from "pixi.js";

interface IGame {
	start(): void;
	stop(): void;
	get stage(): Container<DisplayObject>;
}

export default IGame;
