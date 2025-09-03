export type blockColor = 'blue' | 'white' | 'orange' | 'yellow' | 'red' | 'green' | 'purple';

export class Block {
  x: number;
  y: number;
  color: blockColor;

  constructor(x: number, y: number, color: blockColor) {
      this.x = x;
      this.y = y;
      this.color = color;
  }
}