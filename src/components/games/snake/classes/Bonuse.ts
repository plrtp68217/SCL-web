import { Block } from "./Block";

type BonuseType = 'small' | 'medium' | 'large';

type BonuseRewards = Record<BonuseType, number>;

export class Bonuse extends Block {
    type: BonuseType;
    rewards: BonuseRewards;
    color: string;

    constructor(x: number, y: number, color: string, type: BonuseType) {
        super(x, y, color);
        this.type = type;
        this.rewards = {
            'small': 10,
            'medium': 20,
            'large': 30,
        }
        this.color = 'yellow';
    }

    get reward(): number {
        return this.rewards[this.type];
    }
}