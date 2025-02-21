import { Block } from "./Block"

export class Snake {
    blocks: Block[];
    axis: 'x' | 'y';
    direction: -1 | 1;
    step: number;
    color?: string;

    constructor(axis: 'x' | 'y', direction: -1 | 1, step: number, color: string = 'green') {
        this.blocks = [];
        this.axis = axis;
        this.direction = direction;
        this.step = step;
        this.color = color;
    }

    createNewHead(): Block {
        const oldHead = this.blocks[0];

        const newHeadPositionX = this.axis === 'x' ? oldHead.x + this.step * this.direction : oldHead.x;
        const newHeadPositionY = this.axis === 'y' ? oldHead.y + this.step * this.direction : oldHead.y;

        const newHead = new Block(newHeadPositionX, newHeadPositionY, this.color);
        return newHead;
    }

    move(): void {
        const newHead = this.createNewHead();

        this.blocks.pop();
        this.blocks.unshift(newHead);
    }

    enlarge(): void {
        const newHead = this.createNewHead();
        
        this.blocks.unshift(newHead);
    }

}