import { Board } from "../classes/Board";
import type { IMove } from "../../common/interfaces/move";

export interface BoardEmit {
    (emit: 'board', value: Board): void;
}

export interface ControlEmit {
    (emit: 'move', value: IMove): void;
}