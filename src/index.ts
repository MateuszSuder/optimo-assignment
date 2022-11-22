import { Assets } from "pixi.js";
import { LoaderAssets } from "./types/GameSheets";
import config from "./config/config";
import Game from "./classes/Game/Game";

(async () => {
	const assets = config.assets;

	const sheet = (await Assets.load([...assets])) as LoaderAssets<
		typeof assets
	>;

	new Game({
		character: sheet[config.assets[0]],
		food: sheet[config.assets[1]],
	});
})();
