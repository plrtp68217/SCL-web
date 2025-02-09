import euclidAlg from "../../common/utils/euclid";
import { Snake } from "./Snake";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    snake: Snake;
    step: number;

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.snake = new Snake();
        this.step = euclidAlg(this.width, this.height);
    }
}