import { Shape } from "./Shape";
import euclidAlg from "../utils/euclidAlg";
import { Block } from "../interfaces/shape";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    shapes: Shape[];
    step: number;

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.shapes = [] as Shape[];
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

        // const shapeCollision: boolean = true;
        // const boardCollision: boolean = true;

        // for (let otherShape of this.shapes) {
        //     for (let otherBlock of otherShape.blocks) {
        //         const shapeCollision = shape.blocks.find((block: Block) => 
        //             block.x === otherBlock.x && block.y + this.step === otherBlock.y
        //         );
        //         if (!!shapeCollision) true
        //     }
        // }

        for (let block of shape.blocks) {
            for (let otherBlock of otherShape.blocks) {
                const shapeCollision = shape.blocks.find((block: Block) => 
                    block.x === otherBlock.x && block.y + this.step === otherBlock.y
                );
                if (!!shapeCollision) true
            }
        }

        for (let block of shape.blocks) {
            const blockShapeCollision = this.shapes.find((otherShape: Shape) => 
                shape.x === otherShape.x && shape.y + this.step === otherShape.y
            );
        }

        // const shapeCollision = this.shapes.find((otherShape: Shape) => 
        //     shape.x === otherShape.x && shape.y + this.step === otherShape.y
        // );
        // const boardCollision = shape.x === this.height + this.step;
        // return !!shapeCollision || !!boardCollision;
    }

    draw(shape: Shape) {
        for (let block of shape) {
            this.context.fillStyle = block.color;
            this.context.fillRect(block.x, block.y, this.step, this.step);
        }
    }
}