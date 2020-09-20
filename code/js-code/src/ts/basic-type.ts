
// boolean类型

// 数值类型
// ts中支持es6中新增的二进制和八进制数字自变量的

// 支持二进制、八进制、十进制和十六进制 四种进制的数值
let num = 123
// num = 'abc'
num = 0b1111011 // 这是一个二进制的123
num = 0o173// 八进制
num = 0x7b // 十六进制

// 字符串类型

const fullName = `Bob Bobbington`;
const age = 37;
const sentence = `Hello, my name is ${fullName}.`

// 数组类型
// 三种写法
const list1: number[] = [1, 2, 3]
// 定制了类型数组
const list2: number[] = [1, 2, 3];
// 联合类型
const list3: (string | number)[] = [1, 2, 3];
// 元组类型
// 固定长度固定类型
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"]; // Error
// 枚举类型
enum Color { Red, Green=0, Blue }
console.log(Color, "enum")

// any

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// void类型
//   默认undefined
function warnUser(): void {
    console.log("This is my warning message");
}
let v: void
// v=null//strict、strictNullChecks
// v=undefined

console.log(v, "void")
window
// null、undefined
// 在js中这俩 null 和 undefined 是基础数据类型。在ts中他们既是值也是类型
let u: undefined;
const n = null;
// let num1:number=null
// let num2:number=undefined

// never
// never是任何任意类型的子类型，never可以赋值给其他任意类型，没有任何类型是never的子类型

// Function returning never must have unreachable end point
let neverValue: never
// num=neverValue
function error(message: string): never {
    throw new Error(message);
}
// Inferred return type is never
function fail() {
    return error("Something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
        console.log('a')
    }
}



// object
// 存的是对象在内存中地址的引用

// 我们定义一个对象，obj存的就是这个对象在内存中地址的引用
// declare function create(o: object | null): void;

// create({ prop: 0 }); // OK
// create(null); // OK

// create(42); // Error
// create("string"); // Error

// 类型断言

// 有点像是类型转换

// 通过固定语法把某个值强行指定为我们要制定的类型

// 两种方法as，<type>
const someValue1: any = "this is a string";

// tslint:disable-next-line: no-angle-bracket-type-assertion
const strLength1: number = (<string>someValue1).length;

const someValue: any = "this is a string";


const strLength: number = (someValue as string).length;

const merge=<T,U>(arg1:T,arg2:U):T&U=>{
    let res=<T&U>{};
    res=Object.assign(arg1,arg2)
    return res
}
console.log(merge({a:1,b:2},{a:3}),"dd")