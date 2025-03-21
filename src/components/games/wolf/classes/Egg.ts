import { Board } from "./Board";

export class Egg {
    board: Board;

    x: number;
    y: number;
    radius: number;

    direction: -1 | 1;
    distanceMove: number;


    isFalling: boolean; // падает
    isFallen: boolean; // упало (разбилось)

    constructor(board: Board, x: number, y: number, radius: number) {
        this.board = board;

        this.x = x;
        this.y = y;
        this.radius = radius;

        this.direction = this.x <= 0 ? 1 : -1;
        this.distanceMove = 0;

        this.isFalling = false;
        this.isFallen = false;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath()
        context.fillStyle = 'white';
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }

    clear(context: CanvasRenderingContext2D) {
        context.beginPath()
        context.fillStyle = '#3D3D3C'; // board background-color
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
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