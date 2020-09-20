// //兼容不同数据类型
// class Iterator{
//     constructor(container){
//         this.list=container.list
//         this.index=0
//     }
//     next(){
//         if(this.hasNext()){
//             return this.list[this.index++]
//         }
//         return null
//     }
//     hasNext(){
//         if(this.index>=this.list.length){
//             return false
//     }
//     return true
// }

// }

// class Container{
//     constructor(list){
//         this.list=list
//     }
//     getIterator(){
//         return new Iterator(this)
//     }
// }

// var arr=[1,2,3,4,5]
// let container=new Container(arr)
// let inter=container.getIterator()
// while(inter.hasNext()){
//     console.log(inter.next())
// }



//ES6
function each(data){
    let iterator=data[Symbol.iterator]()
    let item={done:false}
    while(!item.done){
        item=iterator.next()
        if(!item.done){//解决首次
            console.log(item.value,"...")
        }
    }
}

function each2(data){
    //带有遍历器特性的对象，data[Symbol.iterator]有值
    for(let item of data){
        console.log(item)
    }
}
let arr=[1,2,3]
let nodelist=document.getElementsByTagName('div')
let m=new Map()

// m.set('a',100)
// m.set('b',100)
each(arr)
each2(arr)
// each(nodelist)
// each(m)