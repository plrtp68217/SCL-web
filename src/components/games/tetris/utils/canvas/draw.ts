import type {Shape} from  "@/components/games/tetris/interfaces/shape";

export function drawShape(shape: Shape, shapeState: number, blockSize: number, context: CanvasRenderingContext2D): void {
        for (let block of shape[shapeState]) {
            context.fillStyle = block.color;
            context.fillRect(block.x, block.y, blockSize, blockSize);
        }
}