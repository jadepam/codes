type fnType = (a:number|string,...args:number[]) =>number|string
const fn:fnType=(a,b,c=1)=>{
    if(typeof a ==="number"){
        return a+b+c
    }else{
        return `${a}-${b}-${c}`
    }
}
console.log(fn(1,2),"fn-number")
console.log(fn('1',2),"fn-string")

