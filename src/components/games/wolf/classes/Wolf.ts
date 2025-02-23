import { Board } from "./Board";

interface WolfState {
  row: number;
  column: number;
}

export class Wolf {
  spriteX: number;
  spriteY: number;

  width: number;
  height: number;

  collisionX: number;
  collisionY: number;

  state: WolfState;

  constructor(board: Board) {

    this.spriteX = 0;
    this.spriteY = 0;

    this.width = 200;
    this.height = 200;

    this.collisionX = 0;
    this.collisionY = this.height * 0.5;

    this.state = {row: 0, column: 0}
  }

}