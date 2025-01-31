import { Block, Shape } from "./Shape";
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

    isEqualsShapes(shape: Shape, shapeOnBoard: Shape): boolean {
        let isEquals: boolean = true;
        
        for (let block of shape.blocks) {
            isEquals &&= shapeOnBoard.blocks.some(blockOnBoard =>
                blockOnBoard.x === block.x && blockOnBoard.y === block.y);
        }

        if (isEquals) {return true}

        return false;
    }

    isCollision(shape: Shape, axis: 'x' | 'y', direction: -1 | 1): boolean {
        const shapesOnBoard = this.shapesOnBoard.filter(shapeOnBoard => !this.isEqualsShapes(shape, shapeOnBoard));
        
        for (let block of shape.blocks) {
            const nextX = axis === 'x' ? block.x + direction * this.step : block.x;
            const nextY = axis === 'y' ? block.y + direction * this.step : block.y;
    
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

    checkFilledLines(): number[] {
        const filledLineLen = this.width / this.step;
        let filledLinesY: number[] = [];
        
        for (let lineY = this.height - this.step; lineY >= 0; lineY -= this.step) {
            let blocksOfCurrentLine: Block[] = [];

            for (let shapeOnBoard of this.shapesOnBoard) {
                let blocksY =  shapeOnBoard.blocks.filter(block => block.y === lineY)
                if(blocksY) {
                    blocksOfCurrentLine = [... blocksOfCurrentLine, ...blocksY];
                }
            }

            if (blocksOfCurrentLine.length === filledLineLen) {
                filledLinesY.push(lineY);
            }
        }
        return filledLinesY;
    }

    clearFilledLines(filledLinesY: number[]): void {
        for (let lineY of filledLinesY) {
            for (let shape of this.shapesOnBoard) {
                this.clear(shape)
                shape.blocks = shape.blocks.filter(block => block.y !== lineY)
                this.draw(shape)
            }
        }
    }
    
    checkAndClearFilledLines(): void {
        const filledLines = this.checkFilledLines()
        if (filledLines) {
            this.clearFilledLines(filledLines)
        }
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