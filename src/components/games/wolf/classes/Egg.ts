import { Board } from "./Board";

export class Egg {
    board: Board;

    x: number;
    y: number;
    size: number;

    direction: -1 | 1;
    distanceMove: number;

    isFalling: boolean; // падает
    isFallen: boolean; // упало (разбилось)

    egg_spritesheet: HTMLImageElement;

    constructor(
        board: Board, 
        x: number, 
        y: number, 
        size: number,
        egg_spritesheet: HTMLImageElement,
    ) {
        this.board = board;

        this.x = x;
        this.y = y;
        this.size = size;

        this.direction = this.x <= 0 ? 1 : -1;
        this.distanceMove = 0;

        this.isFalling = false;
        this.isFallen = false;

        this.egg_spritesheet = egg_spritesheet;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.egg_spritesheet,
                  this.x, this.y,
                  this.size, this.size,
            );
    }

    clear(context: CanvasRenderingContext2D) {
    context.clearRect(this.x, this.y, this.size, this.size)
  }

    move(angle: number, step: number) {
        if (!this.isFalling) {
            const angleInRadians = angle * (Math.PI / 180);

            const deltaX = this.direction * step * Math.cos(angleInRadians);
            const deltaY = step * Math.sin(angleInRadians);
    
            this.x += deltaX;
            this.y += deltaY;

        }
        else {
            this.y += step;
        }
        
        this.distanceMove += step;
    }
}