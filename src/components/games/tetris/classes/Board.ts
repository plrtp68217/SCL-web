import { Shape } from "./Shape";
import euclidAlg from "../utils/euclidAlg";
import { Block } from "./Shape";
import { getRandomShape } from "../assets/shapes";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    shapes: Shape[];
    fallingShape: Shape[];
    fallingShapeState: number;
    step: number;

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.shapes = [] as Shape[];
        this.fallingShape = getRandomShape();
        this.fallingShapeState = 0;
        this.step = euclidAlg(this.width, this.height);
    }

    isInBounds(shape: Shape): boolean {
        for (let block of shape.blocks) {
            if (block.x >= 0 && block.y <= this.width - this.step) continue;
            else false;
        }
        return true;
    }

    isCollision(shape: Shape): boolean {
        for (let block of shape.blocks) {
            for (let otherShape of this.shapes) {
                const shapeCollision = otherShape.blocks.find((otherBlock: Block) => 
                    block.x === otherBlock.x && block.y + this.step === otherBlock.y
                );
                const boardCollision = block.x === this.height + this.step;
                if (!!shapeCollision || !!boardCollision) true;
            }
        }
        return false;
    }

    draw(shape: Shape) {
        for (let block of shape.blocks) {
            this.context.fillStyle = block.color;
            this.context.fillRect(block.x, block.y, this.step, this.step);
        }
    }

    clear(shape: Shape) {
        for (let block of shape.blocks) {
            this.context.fillStyle = block.color;
            this.context.clearRect(block.x, block.y, this.step, this.step);
        }
    }
}