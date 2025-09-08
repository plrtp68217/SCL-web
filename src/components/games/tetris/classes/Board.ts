import { Shape } from "./Shape";
import { Block, type blockColor } from "./Block";
import euclidAlg from "../../common/utils/euclid";

export class Board {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    shapesOnBoard: Shape[];
    step: number;

    blueBlockSprite: HTMLImageElement;
    greenBlockSprite: HTMLImageElement;
    orangeBlockSprite: HTMLImageElement;
    purpleBlockSprite: HTMLImageElement;
    redBlockSprite: HTMLImageElement;
    whiteBlockSprite: HTMLImageElement;
    yellowBlockSprite: HTMLImageElement;


    constructor(
        context: CanvasRenderingContext2D, 
        width: number, 
        height: number,

        blueBlockSprite: HTMLImageElement,
        greenBlockSprite: HTMLImageElement,
        orangeBlockSprite: HTMLImageElement,
        purpleBlockSprite: HTMLImageElement,
        redBlockSprite: HTMLImageElement,
        whiteBlockSprite: HTMLImageElement,
        yellowBlockSprite: HTMLImageElement,
    ) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.shapesOnBoard = [] as Shape[];
        this.step = euclidAlg(this.width, this.height);

        this.blueBlockSprite = blueBlockSprite;
        this.greenBlockSprite = greenBlockSprite;
        this.orangeBlockSprite = orangeBlockSprite;
        this.purpleBlockSprite = purpleBlockSprite;
        this.redBlockSprite = redBlockSprite;
        this.whiteBlockSprite = whiteBlockSprite;
        this.yellowBlockSprite = yellowBlockSprite;
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

    checkAndClearFilledLines(): number[] {
        const filledLinesY = this.checkFilledLines();

        if (filledLinesY) {
            this.clearFilledLines(filledLinesY);
        }

        return filledLinesY;
    }

    checkFilledLines(): number[] {
        const filledLineLen = this.width / this.step;
        let filledLinesY: number[] = [];
        
        for (let lineY = this.height - this.step; lineY >= 0; lineY -= this.step) {
            let blocksOfCurrentLine: Block[] = [];

            for (let shapeOnBoard of this.shapesOnBoard) {
                let blocksY =  shapeOnBoard.blocks.filter(block => block.y === lineY);

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
                this.clearShape(shape);
                shape.blocks = shape.blocks.filter(block => block.y !== lineY);
                this.drawShape(shape);
            }
        }
    }

    drawShapeOnCenter(shape: Shape): void {
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        for (let block of shape.blocks) {
            this.context.fillStyle = block.color;
            this.context.fillRect(block.x + centerX, block.y + centerY, this.step, this.step);
        }
    }

    drawShape(shape: Shape): void {
        // TODO Проверить на баги
        if (shape.blocks.length == 0) {
            return;
        }

        const shapeSprite = this.getSpriteByColor(shape.blocks[0].color)

        for (let block of shape.blocks) {
            this.context.drawImage(
                shapeSprite, 
                block.x, block.y,
                this.step, this.step,
            )
        }
    }

    drawShapesOnBoard() {
        for (let shape of this.shapesOnBoard) {
            this.drawShape(shape);
        }
    }

    getSpriteByColor(color: blockColor): HTMLImageElement {
        const spritesByColor = {
            'blue' : this.blueBlockSprite,
            'white' : this.whiteBlockSprite,
            'orange' : this.orangeBlockSprite,
            'yellow' : this.yellowBlockSprite,
            'red' : this.redBlockSprite,
            'green' : this.greenBlockSprite,
            'purple' : this.purpleBlockSprite,
        };

        return spritesByColor[color];
    }

    clearShape(shape: Shape): void {
        for (let block of shape.blocks) {
            this.context.clearRect(block.x, block.y, this.step, this.step);
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    reset() {
        this.shapesOnBoard = []
        this.context.clearRect(0, 0, this.width, this.height);
    }
}