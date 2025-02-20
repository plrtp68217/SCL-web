import { Block } from "./Block";
import type { BonuseType } from "../interfaces/bonuse";
import type { BonuseRewards } from "../interfaces/bonuse";


export class Bonuse extends Block {
    type: BonuseType;
    rewards: BonuseRewards;

    constructor(x: number, y: number, type: BonuseType, color: string = 'yellow',) {
        super(x, y, color);
        this.type = type;
        this.rewards = {
            'small': 10,
            'medium': 20,
            'large': 30,
        }
        this.color = color;
    }

    get reward(): number {
        return this.rewards[this.type];
    }
}