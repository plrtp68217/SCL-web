import { Block } from "./Block";

export class Shape {
    blocks: Block[];
    isFalling: boolean;

    constructor() {
        this.blocks = [];
        this.isFalling = true;
    }

    move(axis: 'x' | 'y', step: number) {
        for (let block in this.blocks) {
            this.blocks[block][axis] += step;
        }
    }

    stop() {
        this.isFalling = false;
    }

    start() {
        this.isFalling = true;
    }
}
