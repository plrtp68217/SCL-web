export class Block {
    x: number;
    y: number;
    color: string

    constructor(x: number, y: number, color: string = 'black') {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}