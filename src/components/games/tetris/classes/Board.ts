import { Shape } from "./Shape";
import euclidAlg from "../utils/euclidAlg";
import { Block } from "./Shape";

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

    isInWidthBounds(shape: Shape, direction: -1 | 1): boolean {
        for (let block of shape.blocks) {
            if (direction === -1 && block.x - this.step >= 0) {
                continue;
            }
            else if (direction === 1 && block.x + this.step <= this.width - this.step) {
                continue;
            }
            else {
                return false
            }
        }
        return true;
    }

    isCollision(shape: Shape): boolean {
        for (let block of shape.blocks) {
            const boardCollision = block.y === this.height - this.step;

            if (boardCollision) {
                return true
            }

            if (this.shapes) {
                for (let otherShape of this.shapes) {
                    const shapeCollision = otherShape.blocks.find((otherBlock: Block) => 
                        block.x === otherBlock.x && block.y + this.step === otherBlock.y
                    );
                    
                    if (shapeCollision) {
                        return true;
                    }
                }
            }
        }
        return false;

        // for (let block of shape.blocks) {
        //     for (let otherShape of this.shapes) {
        //         const shapeCollision = otherShape.blocks.find((otherBlock: Block) => 
        //             block.x === otherBlock.x && block.y + this.step === otherBlock.y
        //         );
        //         const boardCollision = block.x === this.height + this.step;

        //         if (shapeCollision || boardCollision) {
        //             return true;
        //         }
        //     }
        // }
        // return false;
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