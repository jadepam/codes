
function  fn (arr){
    let arr=[]
    return new Promise(function(reslove){
        arr.forEach(item => {
            item.then(function(res){
                arr.push(res)
            })
        });
        reslove(arr)
     })
    };

function fibonacci(v){
    console.log(v,"v")
    if(v>=1){
       return v*fibonacci(v-1)
    }else{
      return 1
    }
}

var f = function(n) {
    if(n == 1) {
           return 1
    } else {
           return n * f(n - 1);
    }
}

var obj={
    a:1,
    b(){
        console.log(this,"..")
        this.a+=1
    },
    c:function(){
        console.log(this,this.a)
        
    },
    d:()=>{
        console.log(this,this.a)
    }
}
let {a,b}=obj
b()
obj.b()
console.log(a)
console.log(obj.a)

const a=()=>{

}


//资源加载时间
var xmlhttp = new XMLHttpRequest(),
  method = 'GET',
  url = 'https://developer.mozilla.org/';
const t1=new Date()
xmlhttp.open(method, url, true);
xmlhttp.onload = function () {
  // 处理取回的数据(在 xmlhttp.response 中找到) 
  console.log(new Date()-t1,"const t1=new Date()")
};
xmlhttp.send();