export class Shape {
    x: number;
    y: number;
    color: string;
    isFalling: boolean;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isFalling = true;
    }

    move(axis: 'x' | 'y', step: number) {
        if (axis == 'x') this.x += step;
        else this.y += step;
    }

    stop() {
        this.isFalling = false;
    }

}
