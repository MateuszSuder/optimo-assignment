import { Application, Sprite } from "pixi.js";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: window.innerWidth,
	height: window.innerHeight,
});

const test: Sprite = Sprite.from("assets/Character/character.png");

app.stage.addChild(test);
