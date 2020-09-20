interface Obj {
    key: string;
    val: number;
}
declare type calssType = (Obj)[];
declare abstract class Family {
    constructor();
    abstract fun(): void;
}
declare class Parent extends Family {
    data?: calssType;
    home: string;
    private self;
    constructor(home: string, arg: calssType, self: number);
    protected getVal(): string;
    fun(): void;
}
declare class Child extends Parent {
    constructor(home: string, name: calssType, self: number);
    get(): void;
}
declare const test1: Parent;
declare const test: Child;
declare const createType: <T>(c: new () => T) => T;
declare class Infoss {
    age: number;
    constructor();
}
declare const fns: Infoss;
