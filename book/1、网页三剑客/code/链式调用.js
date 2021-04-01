var Person = function() {};
Person.prototype.set = function (age){
    this.age = 10; 
    return this; //this调用位置决定其词法作用域
}
Person.prototype.get = function (){
    var age = this.age;
    if(age < 6){
        return '我还是个宝宝';
    }else if(age < 18){
        return '我还是个少年';
    }else{
     //……
    }
}

var person = new Person();
person.set(10).get(); // '我还是个少年'
// var person = {
//     set: function (age){
//         this.age = 10;  //this调用位置决定其词法作用域
//         return person ;
//     },
//     get: function (){
//         var age = this.age;
//         if(age < 6){
//             return '我还是个宝宝';
//         }else if(age < 18){
//             return '我还是个少年';
//         }else{
//          //……
//         }
//     }
// }

let arr =Array.from({length:20},(item,index)=>index)
arr.forEach((item)=>{
    setTimeout(
        function(){
            console.log(item,new Date())
        },Math.random()*100)
})
