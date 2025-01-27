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

    // проверка на границу слева справа

    isInBounds(shape: Shape) {
        if (shape.x >= 0 && shape.y <= this.width - this.step) {
            return true
        }
        return false;
    }

    // проверка на колизию с дном поля и фигурой снизу

    isCollision(shape: Shape) {
        const collisionValue = this.shapes.find(otherShape => shape.x == otherShape.x && shape.y + this.step === otherShape.y)

        if (this.shapes
            .find(otherShape => shape.x == otherShape.x &&
                                shape.y + this.step === otherShape.y))
            return true;
        return false;


        if 
    }

}
