import { Wolf } from "./Wolf";
import { Egg } from "./Egg";
import type { ILine } from "../interfaces/line";




export class Board {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  wolf: Wolf;
  eggs: Egg[]

  wolf_spriteSheet: HTMLImageElement;

  constructor(
    context: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    wolf_spriteSheet: HTMLImageElement) 
    {
    this.context = context;
    this.width = width;
    this.height = height;
    this.wolf_spriteSheet = wolf_spriteSheet;
    this.wolf = new Wolf(this, wolf_spriteSheet);
    this.eggs = [];
  }

  drawCollision() {
    this.context.beginPath();
    this.context.fillStyle = 'black';
    this.context.fillRect(this.wolf.collisionX,
                          this.wolf.collisionY,
                          this.wolf.collisionWidth,
                          this.wolf.collisionHeight,
                         );

  }

  clear() {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.width, this.height)
  }

  drawLine(line: ILine) {
    const angleInRadians = line.angle * (Math.PI / 180);

    const endX = line.startX + line.direction * line.length * Math.cos(angleInRadians);
    const endY = line.startY + line.length * Math.sin(angleInRadians);

    this.context.beginPath();
    this.context.moveTo(line.startX, line.startY);
    this.context.lineTo(endX, endY);
    this.context.stroke();
  }

  drawLines(lines: ILine[]) {
    lines.forEach(line => {
      this.drawLine(line);
    });
  }
}