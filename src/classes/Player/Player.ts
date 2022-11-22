import { Container, DisplayObject, Sprite, Texture } from "pixi.js";

export default class Player {
	constructor(texture: Texture, stage: Container<DisplayObject>) {
		stage.addChild(new Sprite(texture));
	}
}
