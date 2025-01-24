export interface Block {
    color: string;
    x: number;
    y: number;
}

export interface Shape {
    [shapeState: number]: Block[];
}

export interface Shapes {
    [shapeName: string]: Shape;
}