import { Spritesheet } from "pixi.js";

export type LoaderAssets<T extends ReadonlyArray<string>> = Record<
	T[number],
	Spritesheet
>;

interface GameSheets {
	character: {
		animations: Spritesheet["animations"];
		textures: Spritesheet["textures"];
	};
	food: {
		textures: Spritesheet["textures"];
	};
}

export default GameSheets;
