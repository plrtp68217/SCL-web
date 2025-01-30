import { Block, Shape } from "../classes/Shape";
import type { IShapeList } from "../assets/shapeList";

function getRandomItem<T>(array: T[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    return randomItem;
}

export function getRandomShapes(shapeList: IShapeList): Shape[] {
    const shapesId: string[] = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
    const randomId = getRandomItem(shapesId);
    const randomShapes: Shape[] = [];

    for (let shapeState in shapeList[randomId]) {
        let randomShapesState: Shape = new Shape();

        randomShapesState.blocks = shapeList[randomId][shapeState].map(block => new Block(block.x , block.y, block.color));
        randomShapes.push(randomShapesState);
    }
    return randomShapes;
}