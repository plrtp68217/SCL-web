import { Wolf } from "./Wolf";
import { Egg } from "./Egg";

export class Board {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  wolf: Wolf;
  eggs: Egg[]

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
    const spriteSheet = document.getElementById('wolf') as HTMLImageElement;
    this.wolf = new Wolf(this, spriteSheet);
    this.eggs = [];
  }


  // drawWolf() {
  //   this.context.drawImage(this.wolf.spriteSheet,
  //     1, 1,
  //     200, 200,
  //     this.wolf.spriteX, this.wolf.spriteY,
  //     200, 200);
    
  //   console.log(this.wolf.spriteSheet);
    
  // }

  drawCollision() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.wolf.collisionX, this.wolf.collisionY, this.wolf.collisionWidth, this.wolf.collisionHeight);

  }
}