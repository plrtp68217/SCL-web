import { Board } from "./Board";
import type { Egg } from "./Egg";
// import type { Egg } from "./Egg";

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
    this.width = 100;
    this.height = 100;

    this.spriteX = board.width * 0.5 - this.width * 0.5;
    this.spriteY = board.height - this.height;

    this.collisionWidth = this.width * 0.4;
    this.collisionHeight = 20;

    this.spriteSheet = spriteSheet;

    this.state = {side: 0, basket: 1}
  }

  get collisionX() {
    if (this.state.side === 0) {
      return this.spriteX // side 0 (лево)
    }
    return this.spriteX + this.width - this.collisionWidth// side 1 (право)
  }

  get collisionY() {
    if (this.state.basket === 0) {
      return this.spriteY + this.height * 0.5 // basket 0 (вниз)
    }
    return this.spriteY + this.collisionHeight * 0.5 // basket 1 (вверх)
  }

  draw(context: CanvasRenderingContext2D) {

    const sheetX = this.state.basket === 0 ? 0 : 200;
    const sheetY = this.state.side === 0 ? 0 : 200;

    context.drawImage(this.spriteSheet,
                      sheetX, sheetY,
                      200, 200,
                      this.spriteX, this.spriteY,
                      this.width, this.height
                    );
  }

  clear(context: CanvasRenderingContext2D) {
    context.clearRect(this.spriteX,
                      this.spriteY,
                      this.width,
                      this.height
                    );
  }

  isEggInBasket(egg: Egg) {
    const isInsideX = egg.x >= this.collisionX && egg.x + egg.size <= this.collisionX  + this.collisionWidth

    const isInsideY = egg.y + egg.size >= this.collisionY && egg.y + egg.size <= this.collisionY + this.collisionHeight

    return isInsideX && isInsideY;
  }


}