import { Board } from "./Board";

export class Egg {
    board: Board;

    x: number;
    y: number;
    radius: number;

    isFalling: boolean;
    isInBasket: boolean;

    constructor(board: Board, x: number, y: number, radius: number) {
        this.board = board;

        this.x = x;
        this.y = y;
        this.radius = radius;

        this.isFalling = false;
        this.isInBasket = false;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'white';
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }

    clear(context: CanvasRenderingContext2D) {
        context.fillStyle = '#3d3c3c'; // board background-color
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }

    move(angle: number, step: number, directon: -1 | 1) {
        if (!this.isFalling) {
            const deltaX = directon * step * Math.cos(angle);
            const deltaY = directon * step * Math.sin(angle);
    
            this.x += deltaX;
            this.y += deltaY;
        }
        else {
            this.y += step;
        }

    }
}