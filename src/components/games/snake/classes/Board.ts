import euclidAlg from "../../common/utils/euclid";
import { Snake } from "./Snake";
import { Apple } from "./Apple";
import { Bonuse } from "./Bonuse";
import { Block } from "./Block";
import { getStartPosition } from "../utils/position";
import { getRandomItem } from "../../common/utils/random";
import type { BonuseType } from "../interfaces/bonuse";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    step: number;
    snake: Snake;
    apple: Apple;
    bonuse: Bonuse;

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.step = euclidAlg(this.width, this.height);
        this.snake = {} as Snake;
        this.apple = {} as Apple;
        this.bonuse = {} as Bonuse;
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
            freeBlocks = freeBlocks.filter(block => !(block.x == busyBlock.x && block.y == busyBlock.y));
        }

        return freeBlocks;
    }

    draw(block: Block) {
        this.context.fillStyle = block.color;
        this.context.fillRect(block.x, block.y, this.step, this.step);
    }
    
    clear(block: Block) {
        this.context.clearRect(block.x, block.y, this.step, this.step);
    }

    createSnake(): void {
        const axis = getRandomItem<'x' |'y'>(['x', 'y']);
        const direction = getRandomItem<-1 | 1>([-1, 1]);
        this.snake = new Snake(axis, direction);

        const position = getStartPosition(this);
        const block = new Block(position.x, position.y);
        this.snake.blocks.push(block);
    }

    createApple(): void {
        let busyBlocks = this.snake.blocks;
        if (this.bonuse) busyBlocks.push(this.bonuse);

        const freeBlocks = this.getFreeBlocks(busyBlocks);

        const block = getRandomItem<Block>(freeBlocks);
        this.apple = new Apple(block.x, block.y);
    }

    createBonuse(): void {
        let busyBlocks = this.snake.blocks;
        if (this.apple) busyBlocks.push(this.apple);

        const freeBlocks = this.getFreeBlocks(busyBlocks);

        const block = getRandomItem<Block>(freeBlocks);
        const type = getRandomItem<BonuseType>(['small', 'medium', 'large']);

        this.bonuse = new Bonuse(block.x, block.y, type);
    }

}