interface SquareConfig {
    width?: number;
    readonly color?: string;
    [prop: string]: any;
}
declare function createSquare(config: SquareConfig): {
    color: string;
    area: number;
};
declare let mySquare: {
    color: string;
    area: number;
};
