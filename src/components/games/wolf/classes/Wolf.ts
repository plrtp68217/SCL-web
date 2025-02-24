import { Board } from "./Board";
import type { Egg } from "./Egg";

interface WolfState {
  side: 0 | 1;
  basket: 0 | 1;
}

export class Wolf {
  width: number;
  height: number;

  spriteX: number;
  spriteY: number;

  collisionWidth: number;
  collisionHeight: number;

  spriteSheet: HTMLImageElement;

  state: WolfState;

  constructor(board: Board, spriteSheet: HTMLImageElement) {
    this.width = 200;
    this.height = 200;

    this.spriteX = board.width * 0.5 - this.width * 0.5;
    this.spriteY = board.height * 0.5;

    this.collisionWidth = this.width * 0.5;
    this.collisionHeight = 40;

    this.spriteSheet = spriteSheet;

    this.state = {side: 0, basket: 0}
  }

  get collisionX() {
    if (this.state.side === 0) {
      return this.spriteX - this.collisionWidth // side 0 (лево)
    }
    else {
      return this.spriteX + this.width // side 1 (право)
    }
  }

  get collisionY() {
    if (this.state.basket === 0) {
      return this.spriteY + this.height * 0.5 // basket 0 (вниз)
    }
    else {
      return this.spriteY // basket 1 (вверх)
    }
  }


  isCollision(egg: Egg) {
  
    // const horizontalBorder = egg.x >= this.collisionX && egg.x + egg.width <=  this.collisionX + 
  
  }

  draw(context: CanvasRenderingContext2D) {

    const sheetX = this.state.basket === 0 ? 0 : this.width;
    const spriteY = this.state.side === 0 ? 0 : this.height;

    context.drawImage(this.spriteSheet,
      sheetX, spriteY,
      200, 200,
      0, 0,
      200, 200);
  }


}