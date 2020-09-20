declare let num: number;
declare const fullName = "Bob Bobbington";
declare const age = 37;
declare const sentence: string;
declare const list1: number[];
declare const list2: number[];
declare const list3: (string | number)[];
declare let x: [string, number];
declare enum Color {
    Red = 0,
    Green = 0,
    Blue = 1
}
declare let notSure: any;
declare function warnUser(): void;
declare let v: void;
declare let u: undefined;
declare const n: any;
declare let neverValue: never;
declare function error(message: string): never;
declare function fail(): never;
declare function infiniteLoop(): never;
declare const someValue1: any;
declare const strLength1: number;
declare const someValue: any;
declare const strLength: number;
declare const merge: <T, U>(arg1: T, arg2: U) => T & U;
