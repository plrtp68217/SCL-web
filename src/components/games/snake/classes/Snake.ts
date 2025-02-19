import { Block } from "./Block"

export class Snake {
    blocks: Block[];
    axis: 'x' | 'y';
    direction: -1 | 1;

    constructor() {
        this.blocks = [];
        this.axis = 'x';
        this.direction = -1;
    }

    move() {

    }

    enlarge() {

    }

}