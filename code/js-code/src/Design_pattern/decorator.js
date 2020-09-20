class circle{
    draw(){
    console.log("画一个圆形")
    }
}
class Decorator{
    constructor(circle){
        this.circle=circle
    }
    draw(){
        this.circle.draw()
        this.setRedBorder(circle)
    }
    setRedBorder(circle){
        console.log("设置红色边框")
    }
}
let circle1 =new circle()
circle1.draw()
let decorator=new Decorator(circle1)
decorator.draw()


//es7
@apo
class Demo{
}
function apo (target){
    target.isDec=true
}
console.log(Demo.isDec,"类装饰器")//true

//mixins
function mixins(...list){
    return function(target){
        Object.assign(target.prototype,...list)
    }
}

class Math{
    @log
    add(a,b){
        return a+b
    }
}
function log(target,name,descriptor){
    console.log(target,name,descriptor,"target,name,descriptor")
    var oldValue=descriptor.value
    decorator.value=function (){
        console.log(`calling ${name} with`,arguments);
        return oldValue.apply(this,arguments)
    }
    return decorator;
}
const math =new Math()
const result =math.add(2,4)
console.log('装饰方法',result)