export class Board {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
  }
}