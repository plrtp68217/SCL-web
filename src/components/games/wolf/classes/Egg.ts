export class Egg {
    x: number;
    y: number;

    radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(context: CanvasRenderingContext2D) {
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        context.fill();
    }

    move(angle: number, step: number, directon: -1 | 1) {
        const deltaX = directon * step * Math.cos(angle);
        const deltaY = directon * step * Math.sin(angle);

        this.x += deltaX;
        this.y += deltaY;
    }
}