import euclidAlg from "../../common/utils/euclid";
import { Snake } from "./Snake";
import { Apple } from "./Apple";
import { Bonuse } from "./Bonuse";
import { Block } from "./Block";
import { getStartPosition } from "../utils/position";
import { getRandomItem } from "../../common/utils/random";
import type { BonuseType } from "../interfaces/bonuse";
import type { IMove } from "../../common/interfaces/emits";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    step: number;
    snake: Snake;
    apple: Apple;
    bonuse: Bonuse;

    // демо вариант для рисования спрайта змейки
    apple_spritesheet: HTMLImageElement;
    snakebody_spritesheet: HTMLImageElement;

    snakeheadtop_spritesheet: HTMLImageElement;
    snakeheadbottom_spritesheet: HTMLImageElement;
    snakeheadleft_spritesheet: HTMLImageElement;
    snakeheadright_spritesheet: HTMLImageElement;
    

    constructor(
        context: CanvasRenderingContext2D, 
        width: number, 
        height: number, 
        apple_spritesheet: HTMLImageElement,
        snakebody_spritesheet: HTMLImageElement,

        snakeheadtop_spritesheet: HTMLImageElement,
        snakeheadbottom_spritesheet: HTMLImageElement,
        snakeheadleft_spritesheet: HTMLImageElement,
        snakeheadright_spritesheet: HTMLImageElement,
    ) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.step = euclidAlg(this.width, this.height);
        this.snake = {} as Snake;
        this.apple = {} as Apple;
        this.bonuse = {} as Bonuse;
        this.apple_spritesheet = apple_spritesheet;
        this.snakebody_spritesheet = snakebody_spritesheet;

        this.snakeheadtop_spritesheet = snakeheadtop_spritesheet;
        this.snakeheadbottom_spritesheet = snakeheadbottom_spritesheet;
        this.snakeheadleft_spritesheet = snakeheadleft_spritesheet;
        this.snakeheadright_spritesheet = snakeheadright_spritesheet;
    }

    
    drawBlock(block: Block) {
        this.context.fillStyle = block.color;
        this.context.fillRect(block.x, block.y, this.step, this.step);
        
    }

    drawEntitie(entitie: Block[]) {
        for (let block of entitie) {
            this.drawBlock(block);
        }
    }

    drawApple(apple: Block) {
        this.context.drawImage(this.apple_spritesheet,
              apple.x, apple.y,
              this.step, this.step,
            );
    }

    drawSnakeHead(snake_head: Block, frameNumber: number, {direction, axis}: IMove) {
        let spriteSheet: HTMLImageElement;

        if (direction == -1 && axis == 'y') {
            spriteSheet = this.snakeheadtop_spritesheet;
        }
        else if (direction == 1 && axis == 'y') {
            spriteSheet = this.snakeheadbottom_spritesheet;
        }
        else if (direction == -1 && axis == 'x') {
            spriteSheet = this.snakeheadleft_spritesheet;
        }
        else if (direction == 1 && axis == 'x') {
            spriteSheet = this.snakeheadright_spritesheet;
        }
        else {
            spriteSheet = this.snakeheadright_spritesheet;
        }

        const spriteNumber = frameNumber - 1
        const spriteX = Math.floor(spriteNumber / 5);
        const spriteY = frameNumber % 5;
        const spriteSize = 100;

        this.context.drawImage(
              spriteSheet,                      // image,
              spriteX * spriteSize,             // sx,
              spriteY *  spriteSize,            // sy,
              spriteSize, spriteSize,           // sWidth, sHeight, 
              snake_head.x, snake_head.y,       // dx, dy, d - destination
              this.step, this.step,             // dWidth, dHeight,
            );
    }

    drawSnakeBody(snake_body: Block[]) {
        for (let block of snake_body) {
            this.context.drawImage(
                this.snakebody_spritesheet,
                block.x, block.y,
                this.step, this.step,
            );
        }
    }
    
    clearBlock(block: Block) {
        this.context.clearRect(block.x, block.y, this.step, this.step);
    }

    clearEntitie(entitie: Block[]) {
        for (let block of entitie) {
            this.clearBlock(block);
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    // поиск пустых блоков для генерации яблока или бонуса на пустом месте в поле
    getFreeBlocks(busyBlocks: Block[]): Block[] {
        const rowsNumber = this.height / this.step;
        const columnsNumber = this.width / this.step;

        let freeBlocks: Block[] = [];

        // в начале добавляем все блоки, из которых состоит поле
        for (let row = 0; row < rowsNumber; row++) {
            for (let column = 0; column < columnsNumber; column++) {
                const block = new Block(column * this.step, row * this.step);
                freeBlocks.push(block);
            }
        }

        // удаляем блоки, которые уже есть на поле
        for (let busyBlock of busyBlocks) {
            freeBlocks = freeBlocks.filter(block => !(block.x == busyBlock.x && block.y == busyBlock.y));
        }

        return freeBlocks;
    }

    createSnake(): void {
        const axis = getRandomItem<'x' |'y'>(['x', 'y']);
        const direction = getRandomItem<-1 | 1>([-1, 1]);
        this.snake = new Snake(axis, direction, this.step);
        
        const position = getStartPosition(this);
        const block = new Block(position.x, position.y, this.snake.color);
        this.snake.blocks.push(block);
    }
    
    
    createApple(): void {
        let busyBlocks = [...this.snake.blocks];
        if (this.bonuse) busyBlocks.push(this.bonuse);
        
        const freeBlocks = this.getFreeBlocks(busyBlocks);
        
        const block = getRandomItem<Block>(freeBlocks);
        this.apple = new Apple(block.x, block.y);
    }
    

    createBonuse(): void {
        let busyBlocks = [...this.snake.blocks];

        if (this.apple) busyBlocks.push(this.apple);

        const freeBlocks = this.getFreeBlocks(busyBlocks);

        const block = getRandomItem<Block>(freeBlocks);
        const type = getRandomItem<BonuseType>(['small', 'medium', 'large']);

        this.bonuse = new Bonuse(block.x, block.y, type);
    }

    isCollision() {
        const snakeHead = this.snake.blocks[0];
        
        if (snakeHead.x < 0 || snakeHead.x > this.width - this.step ||
            snakeHead.y < 0 || snakeHead.y > this.height - this.step) {
            return true;
        }

        const snakeWithoutHead = this.snake.blocks.slice(1);

        if (snakeWithoutHead.find(block => block.x === snakeHead.x && block.y === snakeHead.y)) {
            return true;
        }
        
        return false;
    }

    // общий метод, который указывает, съела ли змейка что-то или нет (яблоко, бонус и т.д)
    isFeed(feed: Block) {
        const snakeHead = this.snake.blocks[0];

        if (snakeHead.x === feed.x && snakeHead.y === feed.y) {
            return true;
        }

        return false;
    }
}