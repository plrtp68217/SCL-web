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

    // поиск пустых блоков для генерации яблока или бонуса на пустом месте в поле
    getFreeBlocks(busyBlocks: Block[]): Block[] {
        const rowsNumber = this.height / this.step;
        const columnsNumber = this.width / this.step;

        let freeBlocks: Block[] = [];

        // в начале добавляем все блоки, из которых состоит поле
        for (let row = 0; row <= rowsNumber; row++) {
            for (let column = 0; column <= columnsNumber; column++) {
                const block = new Block(row * this.step, column * this.step);
                freeBlocks.push(block);
            }
        }

        // удаляем блоки, которые уже есть на поле
        for (let busyBlock of busyBlocks) {
            freeBlocks = freeBlocks.filter(block => !(block.x == busyBlock.x && block.y == busyBlock.y))
        }

        return freeBlocks;
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