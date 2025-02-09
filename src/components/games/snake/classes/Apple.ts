import { Block } from "./Block"

export class Apple extends Block {
    reward: number;

    constructor(x: number, y: number) {
        super(x, y)
        this.reward = 10;
    }
}