import type {Shape} from  "@/components/games/tetris/interfaces/shape";

export function clearBoard(width: number, height: number,  context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, width, height);
}

export function clearShape(shape: Shape, shapeState: number, blockSize: number, context: CanvasRenderingContext2D): void {
    for (let block of shape[shapeState]) {
        context.fillStyle = block.color;
        context.clearRect(block.x, block.y, blockSize, blockSize);
    }
}