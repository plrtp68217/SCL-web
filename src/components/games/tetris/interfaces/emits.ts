import type { IMove } from "../../common/interfaces/move";
import { Board } from "../classes/Board";

export interface ControlEmit {
    (emit: 'move', value: IMove): void;
    (emit: 'rotate'): void;
}

export interface MainBoardEmit {
    (emit: 'main_board', value: Board): void;
}

export interface SecondBoardEmit {
    (emit: 'second_board', value: Board): void;
}