import IStats from "../inferfaces/IStats";
import { Container, DisplayObject, Text, Ticker } from "pixi.js";
import hitTestRectangle from "../utils/hitTestRectangle";
import config from "../config/config";
import Player from "./Player";
import Food from "./Food";
import CanvasObject from "./CanvasObject";

enum STATS_CHILDREN {
	LIVES = "LIVES",
	LIVES_LABEL = "LIVES_LABEL",
	SCORE = "SCORE",
	SCORE_LABEL = "SCORE_LABEL",
}

/**
 * Creates container for stats
 * @param l lives
 * @param p points
 */
const createStatsContainer = (l: number, p: number) => {
	const container = new Container();
	const livesLabel = new Text("Lives: ");
	livesLabel.name = STATS_CHILDREN.LIVES_LABEL;
	const scoreLabel = new Text("Score: ");
	scoreLabel.name = STATS_CHILDREN.SCORE_LABEL;
	const lives = new Text(l);
	lives.name = STATS_CHILDREN.LIVES;
	const score = new Text(p);
	score.name = STATS_CHILDREN.SCORE;
	container.addChild(livesLabel, scoreLabel, lives, score);
	container.position.set(0, config.height - container.height);
	livesLabel.x = 0;
	lives.x = livesLabel.width;
	return container;
};

export default class Stats
	extends CanvasObject<Container<DisplayObject>>
	implements IStats
{
	private readonly onCatch: () => void;
	private readonly onMiss: (lives: number) => void;
	private player: Player;
	private food: Food;
	private _lives: number = config.lives;
	private _score: number = 0;
	private ticker: Ticker;

	constructor(
		player: Player,
		food: Food,
		ticker: Ticker,
		stage: Container<DisplayObject>,
		onCatch: () => void,
		onMiss: (lives: number) => void
	) {
		super(stage, createStatsContainer(config.lives, 0));
		this.player = player;
		this.food = food;
		this.ticker = ticker;
		this.onCatch = onCatch;
		this.onMiss = onMiss;
		this.reset();
		this.ticker.add(this.checkHit, this);
	}

	private checkHit() {
		const foodBounds = this.food.getBounds();
		const playerBounds = this.player.getBounds();

		if (hitTestRectangle(foodBounds, playerBounds)) {
			this.score++;
			this.onCatch();
		}

		if (foodBounds.y > config.height) {
			this.lives--;
			this.onMiss(this.lives);
		}
	}

	public set lives(n: number) {
		this._lives = n;
		const livesObject: Text = this.object.getChildByName(
			STATS_CHILDREN.LIVES
		);
		livesObject.text = this._lives;
	}

	public get lives(): number {
		return this._lives;
	}

	public set score(n: number) {
		this._score = n;
		const scoreObject: Text = this.object.getChildByName(
			STATS_CHILDREN.SCORE
		);
		const scoreLabelObject: Text = this.object.getChildByName(
			STATS_CHILDREN.SCORE_LABEL
		);

		scoreObject.text = this._score;
		scoreLabelObject.x =
			config.width - scoreLabelObject.width - scoreObject.width;
		scoreObject.x = config.width - scoreObject.width;
	}

	public get score(): number {
		return this._score;
	}

	public reset(): void {
		this.lives = config.lives;
		this.score = 0;
	}

	public setFood(f: Food) {
		this.food = f;
	}

	public destroy() {
		this.destroyObject();
		this.ticker.remove(this.checkHit, this);
	}
}
