import { Block } from "./Block"

type BonuseType = 'small' | 'medium' | 'large';

type BonuseRewards = Record<BonuseType, number>;

export class Bonuse extends Block {
    type: BonuseType;
    rewards: BonuseRewards;

    constructor(x: number, y: number, type: BonuseType) {
        super(x, y);
        this.type = type;
        this.rewards = {
            'small': 10,
            'medium': 20,
            'large': 30,
        }
    }

    get reward(): number {
        return this.rewards[this.type];
    }
}