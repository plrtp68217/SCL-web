import euclidAlg from "../../common/utils/euclid";
import { Snake } from "./Snake";
import { Apple } from "./Apple";
import { Bonuse } from "./Bonuse";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    step: number;
    snake: Snake;
    // apple: Apple;
    bonuses: Bonuse[];

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.step = euclidAlg(this.width, this.height);
        this.snake = new Snake();
        // this.apple = [] // метод для генерации яблока на поле
        this.bonuses = []
    }

    drawSnake() {
        for (let block of this.snake.blocks) {
            this.context.fillStyle = 'green';
            this.context.fillRect(block.x, block.y, this.step, this.step);
        }
    }

    moveSnake() {

    }

    enlargeSnake() {

    }
}