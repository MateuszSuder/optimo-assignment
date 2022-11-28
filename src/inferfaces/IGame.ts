import { Container, DisplayObject, Ticker } from "pixi.js";

interface IGame {
	get stage(): Container<DisplayObject>;
	get ticker(): Ticker;
}

export default IGame;
