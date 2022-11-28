import IStats from "../inferfaces/IStats";
import { Container, DisplayObject, Text, Ticker } from "pixi.js";
import hitTestRectangle from "../utils/hitTestRectangle";
import config from "../config/config";
import Player from "./Player";
import Food from "./Food";
import CanvasObject from "./CanvasObject";

enum STATS_CHILDREN {
	lives = "LIVES",
	score = "SCORE",
}

/**
 * Creates container for stats
 * @param l lives
 * @param p points
 */
const createStatsContainer = (l: number, p: number) => {
	const container = new Container();
	const livesLabel = new Text("Lives: ");
	const scoreLabel = new Text("Score: ");
	const lives = new Text(l);
	lives.name = STATS_CHILDREN.lives;
	const score = new Text(p);
	score.name = STATS_CHILDREN.score;
	container.addChild(livesLabel, scoreLabel, lives, score);
	container.position.set(0, config.height - container.height);
	livesLabel.x = 0;
	lives.x = livesLabel.width;
	scoreLabel.x = config.width - scoreLabel.width - score.width;
	score.x = config.width - score.width;
	return container;
};

export default class Stats
	extends CanvasObject<Container<DisplayObject>>
	implements IStats
{
	private player: Player;
	private food: Food;
	private _lives: number = 10;
	private _score: number = 0;

	constructor(
		player: Player,
		food: Food,
		ticker: Ticker,
		stage: Container<DisplayObject>,
		onCatch: () => void,
		onMiss: () => void
	) {
		super(stage, createStatsContainer(10, 0));
		this.player = player;
		this.food = food;
		this.reset();
		ticker.add(() => {
			try {
				const foodBounds = this.food.getBounds();
				const playerBounds = this.player.getBounds();

				if (hitTestRectangle(foodBounds, playerBounds)) {
					onCatch();
					this.score++;
				}

				if (foodBounds.y > config.height) {
					onMiss();
					this.lives--;
				}
			} catch (e) {
				console.log(e);
			}
		});
	}

	public set lives(n: number) {
		this._lives = n;
		const livesObject: Text = this.object.getChildByName(
			STATS_CHILDREN.lives
		);
		console.log(livesObject);
		livesObject.text = this._lives;
	}

	public get lives(): number {
		return this._lives;
	}

	public set score(n: number) {
		this._score = n;
		const scoreObject: Text = this.object.getChildByName(
			STATS_CHILDREN.score
		);
		scoreObject.text = this._score;
	}

	public get score(): number {
		return this._score;
	}

	public reset(): void {
		this.lives = 10;
		this.score = 0;
	}

	public setFood(f: Food) {
		this.food = f;
	}

	public setPlayer(p: Player) {
		this.player = p;
	}
}
