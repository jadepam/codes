// 6. 查找属性路径：
// 例如：var a = {a: {b: {c: 1}, d: [1,2]}, e: 's'}
// 输出：
// [{key: 'abc', value: 1}, {key: 'ad', value: [1,2]}, {key: 'e', value: 's'}]
var a = {a: {b: {c: 1}, d: [1,2]}, e: 's',f:{g:1}}
function fn(a){
    let out=[]
    function find(obj,pkey){
        let key=Object.keys(obj)
        console.log("obj",key,pkey)
        key.forEach((item,index)=>{
            // console.log(Object.prototype.toString.call(obj[item]),obj[item],item,"item")
            // if(typeof obj[item]==="[object Object]"){//
            if(Object.prototype.toString.call(obj[item])==="[object Object]"){
                find(obj[item],item)
               }else{
                pkey&&out.push({key:`${pkey}${item}`,value:obj[item]}) 
                !pkey&&out.push({key:`${item}`,value:obj[item]})
            }
        })
    };
    find(a)
    console.log(out,"out")
    return out
}

fn(a)