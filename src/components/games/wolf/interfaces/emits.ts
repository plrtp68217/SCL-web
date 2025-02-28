import { Board } from "../classes/Board";

export interface BoardEmit {
    (emit: 'board', value: Board): void;
}

export interface IMove {
    side: 0 | 1;
    basket: 0 | 1;
}

export interface ControlEmit {
    (emit: 'move', value: IMove): void;
}