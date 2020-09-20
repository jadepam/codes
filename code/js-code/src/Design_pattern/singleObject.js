//闭包 || es6 static 属性（提案方法）

class singleObject{
	login(){
	console.log("login")
    }
  static instance;// 新提案

  static getInstance(){
    if(false === this.instance instanceof this){
        this.instance = new this;
    }
    return this.instance;
  }
  constructor(){
      this.name="aa"
  }
}
//等价于
// singleObject.getInstance=(function(){
// 	let instance
//   return function(){
//   	if(!instance){
//       instance=new singleObject()
//     }
//     return instance
//   }
// })()
//这里只能使用静态函数getInstance，不能new singleObject
let login1=singleObject.getInstance()
let login2=singleObject.getInstance()
console.log(login1===login2,login1,login2,"class ßstatic 属性")
let login3=new singleObject()
let login4=new singleObject()
console.log(login3===login4,"非单例模式，多次new 实例化")
