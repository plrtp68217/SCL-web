interface Hsl {
    hue: number;
    saturation: number;
    lightness: number;
}

export class Square {
    x: number;
    y: number;
    size: number;
    hslShift: number = 10;
    hslDirection: -1 | 1 = -1;
    hsl: Hsl;
    hslList: Hsl[] = [
        {hue: 280, saturation: 100, lightness: 69},
        {hue: 282, saturation: 97, lightness: 62},
        {hue: 284, saturation: 98, lightness: 58},
        {hue: 286, saturation: 100, lightness: 55},
    ];
    hslIndex: number;
    isAnimate: boolean = Math.random() <= 0.1 ? true : false;

    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hslIndex = this.getHslIndex();
        this.hsl = {...this.hslList[this.hslIndex]};
    }

    get color(): string {
        const color: string = `hsl(${this.hsl.hue}, ${this.hsl.saturation}%, ${this.hsl.lightness}%)`;
        return color;
    }

    changeHsl() {
        this.hsl.saturation += this.hslDirection;
        this.hsl.lightness += this.hslDirection;

        if (this.hsl.saturation === this.hslList[this.hslIndex].saturation - this.hslShift) {
            this.hslDirection = 1;
        }
        else if (this.hsl.saturation === this.hslList[this.hslIndex].saturation) {
            this.hslDirection = -1;
            this.isAnimate = false;
        }
    }

    getHslIndex() {
        const hslListLen: number = this.hslList.length;
        const hslIndex: number = Math.floor(Math.random() * hslListLen);
        return hslIndex;
    }

}