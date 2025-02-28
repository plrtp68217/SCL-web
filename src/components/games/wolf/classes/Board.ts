import { Wolf } from "./Wolf";
import { Egg } from "./Egg";

export class Board {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  spriteSheet: HTMLImageElement;
  wolf: Wolf;
  eggs: Egg[]

  constructor(context: CanvasRenderingContext2D, width: number, height: number, spriteSheet: HTMLImageElement) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.spriteSheet = spriteSheet;
    this.wolf = new Wolf(this, spriteSheet);
    this.eggs = [];
  }


  drawCollision() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.wolf.collisionX, this.wolf.collisionY, this.wolf.collisionWidth, this.wolf.collisionHeight);

  }
}