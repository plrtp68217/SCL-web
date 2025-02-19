import { Block } from "./Block"

export class Apple extends Block {
    reward: number;
    color: string;

    constructor(x: number, y: number) {
        super(x, y)
        this.reward = 10;
        this.color = 'red';
    }
}