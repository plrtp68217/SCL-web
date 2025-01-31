import type { IMove } from "./move";
import { Board } from "../classes/Board";

export interface ControlEmits {
    (emit: 'move', value: IMove): void;
    (emit: 'rotate'): void;
}

export interface MainBoardEmits {
    (e: 'main_board', value: Board): void;
}

export interface SecondBoardEmits {
    (e: 'second_board', value: Board): void;
}