import { Shape } from "./Shape";
import euclidAlg from "../utils/euclidAlg";

export class Board {
    width: number;
    height: number;
    shapes: Shape[];
    step: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.shapes = [] as Shape[];
        this.step = euclidAlg(this.width, this.height);
    }

    isInBounds(shape: Shape) {
        if (shape.x >= 0 && shape.y <= this.width - this.step) true
        return false;
    }

    isCollision(shape: Shape): boolean {
        const shapeCollision = this.shapes.find((otherShape: Shape) => 
            shape.x === otherShape.x && shape.y + this.step === otherShape.y
        );
        const boardCollision = shape.x === this.height + this.step;
        return !!shapeCollision || !!boardCollision;
    }
}