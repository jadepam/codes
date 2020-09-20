// const s1=Symbol("ss")
// console.log(s1.toString(),"ss")
// console.log(Boolean(s1))
// console.log(s1*1)
// const s2=Symbol()

// console.log(s1===s2)

// 属性名的遍历

const sym = Symbol(1);

// let obj = {
//     [sym]: "value",
//     name:"pam",
//     age:18
// };

// // console.log(Symbol()===Symbol(),'Symbol')

// console.log(Object.keys(obj),"属性名的遍历Object.keys()"); // "value"
// console.log(Object.getOwnPropertyNames(obj),"属性名的遍历Object.getOwnPropertyNames()"); // "value"
// console.log(JSON.stringify(obj),"属性名的遍历JSON.stringify()"); // "value"
// console.log(Reflect.ownKeys(obj),"属性名的遍历Reflect.ownKeys()"); // "value"

// const getClassNameSymbol = Symbol();


// class C extends Array{
//     constructor(...args:any){
//         super(...args)
//     }
//     static get [Symbol.species] () {
//         return Array
//     }
//     [sym](){
//         return "C";
//      }
//     getName(){
//         return "hello"
//     }
// }


// let c = new C(1,2,3)
// const a=c.map(r=>r+1)
// console.log( c,c instanceof C,C instanceof Array,typeof C)
// console.log( a,a instanceof C,a instanceof Array,typeof a)