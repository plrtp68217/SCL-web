import { Shape } from "../classes/Shape";
import { Board } from "../classes/Board";
import { Block } from "../classes/Shape";

/**
* Возвращает случайную позицию в нужном диапазоне с нужным шагом.
* @param {number} min - Начало диапазона.
* @param {number} max - Конец диапазона.
* @param {number} num - Шаг.
* @returns {number}
*/
function getStartPosition(min: number, max: number, num: number): number {
    return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
}

export function getShapesWithStartPosition(shapes: Shape[], board: Board): Shape[] {
    const position = getStartPosition(0, board.width - (3 * board.step), board.step);

    const shapesWithStartPosition: Shape[] = [];

    for (let shape of shapes) {
        const shapeWithStartPosition: Shape = new Shape();

        shapeWithStartPosition.blocks = shape.blocks.map(block => new Block(block.x + position, block.y, block.color));
        shapesWithStartPosition.push(shapeWithStartPosition);
    }
    return shapesWithStartPosition;
}