import { Shape } from "./Shape";
import euclidAlg from "../utils/euclidAlg";
import { Block } from "./Shape";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    shapesOnBoard: Shape[];
    step: number;

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.shapesOnBoard = [] as Shape[];
        this.step = euclidAlg(this.width, this.height);
    }

    isHorizontalCollision(shape: Shape, direction: -1 | 1): boolean { // horizontalCollision
        for (let block of shape.blocks) {

            switch (direction) {
                case -1:
                    const leftBoardCollision = block.x - this.step < 0;
                    if (leftBoardCollision) {return true}

                    if (this.shapesOnBoard) {
                        for (let shapeOnBoard of this.shapesOnBoard) {
                            const leftShapeCollision = shapeOnBoard.blocks.find(blockOnBoard => 
                                blockOnBoard.x == block.x - this.step && blockOnBoard.y == block.y);
                            if (leftShapeCollision) {return true}
                        }
                    }
                    continue;
                
                case 1:
                    const rightBoardCollision = block.x + this.step > this.width - this.step;
                    if (rightBoardCollision) {return true}

                    if (this.shapesOnBoard) {
                        for (let shapeOnBoard of this.shapesOnBoard) {
                            const rightShapeCollision = shapeOnBoard.blocks.find(blockOnBoard => 
                                blockOnBoard.x == block.x + this.step && blockOnBoard.y == block.y)
                            console.log(rightShapeCollision);
                            
                            if (rightShapeCollision) {return true}
                        }
                    }
                    continue;

            }
        
        }
        return false;
    }   

    isVerticalCollision(shape: Shape): boolean { // verticalCollision
        for (let block of shape.blocks) {
            const boardCollision = block.y === this.height - this.step;
            if (boardCollision) {
                return true
            }

            if (this.shapesOnBoard) {
                for (let otherShape of this.shapesOnBoard) {
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