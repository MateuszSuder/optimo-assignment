export const keys = {
	left: "ArrowLeft",
	right: "ArrowRight",
} as const;

export const eventType = {
	keydown: true,
	keyup: false,
};

type Side = "left" | "right";

type Handler = (isDown: boolean) => void;

type LeftHandler = { leftHandler: Handler };
type RightHandler = { rightHandler: Handler };
type BothHandler = LeftHandler & RightHandler;
type MovableOptions = BothHandler;

export default abstract class Movable {
	protected velocity: number = 0;

	protected constructor(options: MovableOptions) {
		if ("leftHandler" in options) {
			document.addEventListener("keydown", (e) =>
				this.handleKey(e, keys.left, options.leftHandler)
			);
			document.addEventListener("keyup", (e) =>
				this.handleKey(e, keys.left, options.leftHandler)
			);
		}

		if ("rightHandler" in options) {
			document.addEventListener("keydown", (e) =>
				this.handleKey(e, keys.right, options.rightHandler)
			);
			document.addEventListener("keyup", (e) =>
				this.handleKey(e, keys.right, options.rightHandler)
			);
		}
	}

	private handleKey(
		event: KeyboardEvent,
		keyCode: typeof keys[keyof typeof keys],
		callback: Handler
	) {
		if (event.code === keyCode) {
			callback(event.type === "keydown");
		}
	}
}
