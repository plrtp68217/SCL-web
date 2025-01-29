export class State {
    value: number;

    constructor() {
        this.value = 0;
    }

    increment<T>(array: T[]) {
        this.value  = (this.value + 1) % array.length;
    }

    reset() {
        this.value = 0;
    }
}