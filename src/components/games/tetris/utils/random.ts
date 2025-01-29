import { Block, Shape } from "../classes/Shape";
import type { IShapeList, IBlock } from "../assets/shapeList";

export function getRandomItem<T>(array: T[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    return randomItem;
}

function createNewBlock(block: IBlock): Block {
    const newBlock =  new Block(block.x, block.y, block.color);
    return newBlock;

}

export function getRandomShapes(shapeList: IShapeList): Shape[] {
    const shapeIds: string[] = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
    const randomId = getRandomItem(shapeIds);
    let randomShape: Shape[] = [];
    
    for (let shapeState in shapeList[randomId]) {
        let randomShapeState = new Shape();

        randomShapeState.blocks = shapeList[randomId][shapeState].map(block => createNewBlock(block));
        randomShape.push(randomShapeState);
    }
    return randomShape;
}

