const EventEmitter=require('events').EventEmitter
// const emitter1=new EventEmitter()
// emitter1.on('some',info=>{
//     console.log("fn1",info)
// })
// emitter1.on('some',info=>{
//     console.log("fn2",info)
// })
// emitter1.emit('some',"XXX")
//继承
class Dog extends EventEmitter {
    constructor(name){
        super()
        this.name=name
    }
}
let simon =new Dog("simon")
simon.on('black',()=>{
    console.log("simon1")
})
simon.on('black',()=>{
    console.log("simon2")
})
simon.emit("xxx")

// setInterval(function(){
//     simon.emit("xxx")
// },1000)
