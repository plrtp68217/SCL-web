import euclidAlg from "../../common/utils/euclid";
import { Snake } from "./Snake";
import { Apple } from "./Apple";
import { Bonuse } from "./Bonuse";
import { Block } from "./Block";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    step: number;
    snake: Snake;
    apple: Apple;
    bonuses: Bonuse[];

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.step = euclidAlg(this.width, this.height);
        this.snake = {} as Snake;
        this.apple = {} as Apple;
        this.bonuses = [];
    }

    getFreeBlocks(busyBlocks: Block[]): Block[] { // поиск пустых блоков для генерации яблока или бонуса
        const rowsNumber = this.height / this.step;
        const columnsNumber = this.width / this.step;

        let allBlocks: Block[] = []; // сформировать массив блоков, из которых состоит игровое поле

        for (let row = 0; row <= rowsNumber; row++) {
            for (let column = 0; column <= columnsNumber; column++) {
                const block = new Block(row * this.step, column * this.step)
                allBlocks.push(block)
            }
        }
    }

    draw(block: Block) {
        this.context.fillStyle = block.color;
        this.context.fillRect(block.x, block.y, this.step, this.step);
    }

    createSnake() {

    }

    createApple(): void {
        
    }

    createBonuse() {

    }

}