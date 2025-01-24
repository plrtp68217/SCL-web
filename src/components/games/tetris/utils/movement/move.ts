import type { Shape } from  "@/components/games/tetris/interfaces/shape";
import type { Block } from "@/components/games/tetris/interfaces/shape";

/**
 * Перемещает все блоки фигуры на указанное количество шагов по заданной оси.
 *
 * @param {Shape} shape - Объект фигуры, который нужно переместить. Фигура состоит из состояний (например, поворотов),
 * каждое из которых содержит массив блоков. Каждый блок имеет свойства `x`, `y` и `color`.
 * @param {number} step - Количество шагов для перемещения. Может быть положительным (движение вправо или вниз)
 * или отрицательным (движение влево или вверх).
 * @param {'x' | 'y'} axis - Ось, по которой происходит перемещение. Допустимые значения: `'x'` (горизонтальная ось)
 * или `'y'` (вертикальная ось).
 * @returns {void} Функция не возвращает значение, так как изменяет переданный объект `shape`.
 *
 * @example
 * const shapes = {
 *   'I': {
 *     1: [{ color: 'blue', x: 0, y: 0 }, { color: 'blue', x: 0, y: 20 }],
 *     2: [{ color: 'blue', x: 0, y: 0 }, { color: 'blue', x: 20, y: 0 }],
 *   },
 * };
 *
 * // Перемещаем фигуру 'I' на 10 шагов вправо (по оси x) (если влево, то -10)
 * moveShape(shapes['I'], 10, 'x');
 *
 * // Перемещаем фигуру 'I' на 5 шагов вниз (по оси y) (если вверх, то -5)
 * moveShape(shapes['I'], 5, 'y');
 */
export function moveShape(shape: Shape, step: number, axis: 'x' | 'y'): void {
    for (let shapeState in shape) {
        for (let block in shape[shapeState]) {
                shape[shapeState][block][axis] += step;
        }
    }
}