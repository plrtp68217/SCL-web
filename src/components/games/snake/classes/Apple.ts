import { Block } from "./Block"

export class Apple extends Block {
    reward: number;

    constructor(x: number, y: number, color: string = 'red') {
        super(x, y, color)
        this.reward = 30;
    }
}