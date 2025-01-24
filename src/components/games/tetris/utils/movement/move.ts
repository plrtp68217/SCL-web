import type {Shape} from  "@/components/games/tetris/interfaces/shape";

export function moveShape(shape: Shape, step: number, axis: string): void {
    for (let shapeState in shape) {
        for (let block in shape[shapeState]) {
            if (axis === 'x') {
                shape[shapeState][block].x += step;
            }
            else {
                shape[shapeState][block].y += step;
            }
        }
    }
}