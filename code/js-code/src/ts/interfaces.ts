interface SquareConfig {
    width?: number;
    readonly color?: string;
    [prop:string]:any,

}

function createSquare(config: SquareConfig): {color: string; area: number} {
    const newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return {...config,...newSquare};
}

let mySquare = createSquare({color: "blackth"});
mySquare.color="dd"
console.log(mySquare,"interface-mySquare---")
