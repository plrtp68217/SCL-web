import { Board } from "../classes/Board";

export interface BoardEmit {
    (e: 'board', value: Board): void;
}