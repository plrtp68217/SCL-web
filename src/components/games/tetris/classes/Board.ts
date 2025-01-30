import { Shape } from "./Shape";
import euclidAlg from "../utils/euclidAlg";

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

    isEqualsShapes(shape: Shape, shapeOnBoard: Shape) {
        let isEquals: boolean = true;
        
        for (let block of shape.blocks) {
            isEquals &&= shapeOnBoard.blocks.some(blockOnBoard => blockOnBoard.x === block.x && blockOnBoard.y === block.y);
        }
        if (isEquals) {return true}

        return false;
    }

    isCollision(shape: Shape, axis: 'x' | 'y', direction: -1 | 1 | 0 = 0): boolean {
        const shapesOnBoard = this.shapesOnBoard.filter(shapeOnBoard => !this.isEqualsShapes(shape, shapeOnBoard));
        
        for (let block of shape.blocks) {
            const nextX = axis === 'x' ? block.x + direction * this.step : block.x;
            const nextY = axis === 'y' ? block.y + (direction || 1) * this.step : block.y;
    
            const isBoardCollision =
                nextX < 0 || nextX >= this.width ||
                nextY >= this.height;
            if (isBoardCollision) {
                return true;
            }
    
            if (this.shapesOnBoard) {
                for (let shapeOnBoard of shapesOnBoard) {
                    const isShapeCollision = shapeOnBoard.blocks.some(blockOnBoard =>
                        blockOnBoard.x === nextX && blockOnBoard.y === nextY
                    );
                    if (isShapeCollision) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isRotationCollision(nextShapeState: Shape): boolean {
        for (let block of nextShapeState.blocks) {
            if (block.x < 0 || block.x >= this.width || block.y >= this.height) {
                return true;
            }
        }
        
        if (this.shapesOnBoard) {
            for (let shapeOnBoard of this.shapesOnBoard) {
                for (let block of nextShapeState.blocks) {
                    const isShapeCollision = shapeOnBoard.blocks.some(blockOnBoard =>
                        blockOnBoard.x === block.x && blockOnBoard.y === block.y
                    );
                    if (isShapeCollision) {
                        return true;
                    }
                }
            }
        }
    
        return false;
    }

    checkAndClearLines(): void {

    }

    drawOnCenter(shape: Shape): void {
        const centerX = (this.width / 2);
        const centerY = this.height / 2
        for (let block of shape.blocks) {
            this.context.fillStyle = block.color;
            this.context.fillRect(block.x + centerX, block.y + centerY, this.step, this.step);
        }
    }

    draw(shape: Shape): void {
        for (let block of shape.blocks) {
            this.context.fillStyle = block.color;
            this.context.fillRect(block.x, block.y, this.step, this.step);
        }
    }

    clear(shape: Shape): void {
        for (let block of shape.blocks) {
            this.context.fillStyle = block.color;
            this.context.clearRect(block.x, block.y, this.step, this.step);
        }
    }
}