import { Shape } from "../classes/Shape";
import { Block } from "../classes/Block";
import type { IShapeList } from "../assets/shapeList";
import { getRandomItem } from "../../common/utils/random";

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