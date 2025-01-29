import { Shape } from "../classes/Shape";
import type { IShapes } from "../assets/shapeList";

export function getRandomItem<T>(array: T[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    return randomItem;
}

export function getRandomShape(shapes: IShapes): Shape[] {
    const shapeIds: string[] = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
    const randomId = getRandomItem(shapeIds);
    let randomShape: Shape[] = [];
    
    for (let shapeState in shapes[randomId]) {
        let randomShapeState = new Shape()
        for (let block of shapes[randomId][shapeState]) {
            randomShapeState.blocks.push(block)
        }
        randomShape.push(randomShapeState)
    }
    return randomShape;
}
