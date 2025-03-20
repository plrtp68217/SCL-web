import { Board } from "./Board";

export class Egg {
    board: Board;

    x: number;
    y: number;
    radius: number;

    isInBasket: boolean;

    constructor(board: Board, x: number, y: number, radius: number) {
        this.board = board;

        this.x = x;
        this.y = y;
        this.radius = radius;

        this.isInBasket = false;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'white';
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }

    move(angle: number, step: number, directon: -1 | 1) {
        const deltaX = directon * step * Math.cos(angle);
        const deltaY = directon * step * Math.sin(angle);

        this.x += deltaX;
        this.y += deltaY;
    }
}