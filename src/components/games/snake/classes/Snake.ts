import { Block } from "./Block"

export class Snake {
    blocks: Block[];
    axis: 'x' | 'y';
    direction: -1 | 1;
    color?: string

    constructor(axis: 'x' | 'y', direction: -1 | 1, color: string = 'green') {
        this.blocks = [];
        this.axis = axis;
        this.direction = direction;
        this.color = color;
    }

    move() {

    }

    enlarge() {

    }

}