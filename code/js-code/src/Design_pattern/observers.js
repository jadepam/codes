class Subject{
    constructor(){
        this.state=0
        this.observers=[]
    }
    getState(){
        return this.state
    }
    setState(state){
        this.state=state
        this.notifyAllObservers()
    }
    notifyAllObservers(){
        this.observers.forEach(observers=>{
            observers.update()
        })
    }
    attach(observers){
        this.observers.push(observers)
    }
}
//观察者
class observers{
    constructor(name,subject){
       this.name=name
       this.subject=subject
       this.subject.attach(this) 
    }
    update(){
        console.log(`${this.name} update`,this.subject)
    }
}
let s=new Subject()
let o=new observers("o1",s)
let o2=new observers("o2",s)
let o3=new observers("o3",s)

s.setState(1)