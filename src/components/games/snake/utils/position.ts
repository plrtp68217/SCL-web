import type { Board } from "../classes/Board";

interface Position {
  x: number,
  y: number
}

function getAxisPosition(board: Board): number {
  const min = board.step * 3;
  const max = board.width - board.step * 3;

  const axisPosition = Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / board.step) * board.step;

  return axisPosition;
}

export function getStartPosition(board: Board): Position {
  const startX = getAxisPosition(board);
  const startY = getAxisPosition(board);

  return {x: startX, y: startY};
}