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

    isCollision(shape: Shape, axis: 'x' | 'y', direction: -1 | 1 | 0 = 0): boolean {
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
                for (let shapeOnBoard of this.shapesOnBoard) {
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