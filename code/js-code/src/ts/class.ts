interface Obj {
    key:string,
    val:number
}
type calssType = (Obj)[]
abstract class Family{
    constructor(){}
    abstract fun():void

}
class Parent extends Family{
    data?:calssType
    home:string
    private self:number// 子类不可访问
    constructor(home:string,arg:calssType,self:number){
        super()
        this.data=arg
        this.self=self
        this.home=home
    }
    protected getVal(){// protected父类型不能创造实例，但是子类型可以
        console.log(this.data,"getVal_Parent")
        return `${JSON.stringify(this.data)}-${this.self}`
    }
    fun(){
        this.getVal()
        console.log(this.home,"fun")
    }
}
class Child extends Parent{
    constructor(home:string,name: calssType,self:number){
        super(home,name,self)
    }
    get(){
        // this.fun
        console.log(this.getVal(),"get_Child")
    }
}

console.log(Parent,"Parent")
const test1=new Parent("前端大军",[{key:'a',val:1},{key:'b',val:2},{key:'c',val:3},{key:'d',val:4}],1)

// test1.getVal();

test1.fun()
const test=new Child("前端小军",[{key:'a',val:1},{key:'b',val:2},{key:'c',val:3},{key:'d',val:4}],2)

test.get()
test.fun()


const createType =<T>(c:new() => T):T => {
    return new c()
}
class Infoss{
  public age:number
  constructor(){
    this.age=18
  }
}
const fns=createType<Infoss>(Infoss)
console.log(fns,"fns")
