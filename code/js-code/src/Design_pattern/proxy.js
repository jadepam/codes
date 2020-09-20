//经纪人
let agent =new Proxy(star,{
    get:function(target,key){

    },
    set:function(target,key,val){

    }
})
//明星
let star={
    name:'',
    age:'',
    phone:''
}