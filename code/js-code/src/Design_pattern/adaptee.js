class Adaptee{
    specificRequest(){
        return "日本插头"
    }
}

class Target{
    constructor(){
        this.adaptee=new Adaptee()
    }
    request(){
        let info=this.adaptee.specificRequest()
        return `${info}->转换器-》中国标准插头`
    }
}
let target=new Target()
console.log(target.request(),"适配器模式")