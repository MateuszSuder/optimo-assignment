const config = {
	canvasId: "pixi-canvas",
	assets: [
		"assets/character/character.json",
		"assets/food/food.json",
	] as const,
	height: 768,
	width: 1366,
	playerSpeed: 7.5,
	lives: 10,
};

export default config;
