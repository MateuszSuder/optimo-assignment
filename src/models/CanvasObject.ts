import { AnimatedSprite, Container, DisplayObject, Sprite } from "pixi.js";

/**
 * Basic canvas object
 */
export default abstract class CanvasObject<
	T extends Sprite | AnimatedSprite | Container<DisplayObject>
> {
	protected object: T;
	private stage: Container<DisplayObject>;

	protected constructor(stage: Container<DisplayObject>, object: T) {
		this.stage = stage;
		this.object = object;

		this.stage.addChild(this.object);
	}

	/**
	 * Remove canvas object
	 */
	public destroyObject(): void {
		this.stage.removeChild(this.object);
	}
}
