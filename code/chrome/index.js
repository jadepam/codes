 //监听的事件
 chrome.bookmarks.onCreated.addListener( (id, bookmark)=> {
	console.log(id, bookmark, "id, onCreated")
	wrap.deal_onCreated&&wrap.isLogin&&wrap.api_updata()
})
chrome.bookmarks.onRemoved.addListener( (id, removeInfo)=> {
	console.log(id, removeInfo, "id, removeInfo")
	wrap.deal_onCreated&&wrap.isLogin&&wrap.api_updata()
})

chrome.bookmarks.onChanged.addListener( (id, changeInfo)=> {
	console.log(id, changeInfo, "changed")
	wrap.deal_onCreated&&wrap.isLogin&&wrap.api_updata()
})

chrome.bookmarks.onMoved.addListener( (id, moveInfo)=> {
	console.log(id, moveInfo, "id, onMoved")
	wrap.deal_onCreated &&wrap.isLogin&&wrap.api_updata()
})
//文件夹中的子节点在用户界面中调整顺序时产生
chrome.bookmarks.onChildrenReordered.addListener( (id, reorderInfo)=> {
	console.log(id, reorderInfo, "id, reorderInfo")
	wrap.deal_onCreated &&wrap.isLogin&&wrap.api_updata()
})
chrome.bookmarks.onImportBegan.addListener( ()=> {
	wrap.deal_onCreated = false
})

chrome.bookmarks.onImportEnded.addListener( ()=> {
	wrap.deal_onCreated = true
})
chrome.storage.local.get("userid",  (c)=> {
	if(c.userid&&c.userid.data.id){
		wrap.user_info = c.userid.data
		wrap.isLogin=true
		wrap.data_source="cloud"
	}
	
})
chrome.storage.local.get("local_bookmark",  (c)=> {
	wrap.local_bookmarks = c.data
})
var wrap = new Vue({
    el: "#app",
    data: {
        data_source: "local",
        user_info: { 
            "phone": "18257488168",
            "passwd": "123",
            "name": "jadepam"
        },
        cloud_bookmarks: [],
        local_bookmarks: [],
        deal_onCreated: true,//flag判断新增
        isLogin:false,
        is_focus_new_tab:true,
        key_word:null,
        data:get_date(),
        checkout:true,
        active:0,
        // tabs:['书签','访问记录','网络搜索']
        tabs:[
            chrome.i18n.getMessage('bookmark'),
            chrome.i18n.getMessage('history'),
            chrome.i18n.getMessage('web')
        ]
    },
    watch: {
        cloud_bookmarks(v){
            console.log(v,"cloud_bookmarks")
        }
    },
    computed: {

    },
    create(){
       this.item= setInterval(()=>{
            this.data=get_date()
        },1000)

        chrome.bookmarks.getTree( (c)=> {
            console.log(c,"local_bookmarks")})
    },
    destoryed(){
        clearInterval(this.item)
    },
    methods: {
        signUp() {//注册
            this.savelocal_bookmark()
             post_data("/user/signUp", { 
                ...this.user_info
            }, (v)=>{
                 if(v.errno===0){
                    this.data_source= "cloud"
                    this.isLogin=true
                    this.checkout=false
                    this.user_info={...this.user_info,...v.data}
                    chrome.storage.local.set({ "userid": { data:this.user_info} })//存储用户信息
                 }else{
                    toast.show(v.errmsg)
                 }
             })
        },
        signIn() {//登录
            this.savelocal_bookmark()
            // this.setCookie()
             post_data("/user/signIn", {
                ...this.user_info
             }, (v)=>{
                 console.log(v,"v",toast)
                if(v.errno===0){
                    this.user_info={...this.user_info,...v.data}
                    this.data_source="cloud"
                    this.isLogin=true
                    this.checkout=false
                    chrome.storage.local.set({ "userid": { data:this.user_info} })//存储用户信息
                    this.gedata()//获取云端数据
                 }else{
                    toast.show(v.errmsg)
                 }                
             })
        },
        logout() {//退出登录则
            this.user_info.id=null
            this.user_info.passwd=null
            chrome.storage.local.set({ "userid": { data:this.user_info} }, (params)=> {
                this.data_source="local"
                this.isLogin=false
            })
            this.syncLocal()//还原本地数据
            chrome.storage.local.remove("local_bookmark")////删除缓存
        },
        //获取远端数据并创建数据
        gedata() {
            post_data("/bookmark/list", false, (v)=>{
                if(v.errno===0){
                    this.syncData(v.data[0].children,v.data[0].children.id)
                 }else if(v.errno===223){
                    this.api_updata()//传递远端数据
                 } else{
                    toast.show(v.errmsg)
                 }
                
            },this.user_info.id)
        },
        //同步数据
        async syncData(Data,id) {
            this.deal_onCreated = false
            console.log(Data,"Data")
            await Data.forEach(item => {
                console.log(item,"item")
                chrome.bookmarks.create({ title: item.title, parentId: id, index: item.index, url: item.url ? item.url : null },(v)=>{
                    console.log(v,"isd")
                    if (item.children) {
                        this.syncData(item.children,v.id)
                    }
                })
                
            })
            this.deal_onCreated = true
        },
        //传递远端数据
        api_updata() {
            console.log("api_updata")
            chrome.bookmarks.getTree((c)=> {
                console.log(c)
                post_data("/bookmark/sync", c, (v)=>{
                    if(c.errno!==0){
                        toast.show(v.errmsg)
                     }       
                },this.user_info.id)
            })
        },
        savelocal_bookmark() {
            chrome.bookmarks.getTree( (c)=> {
                chrome.storage.local.set({ "local_bookmark": { "date": get_date(), "data": c } })
            })
        },
        open_webpage:function(url){
            chrome.tabs.create({url:url, active:true})
        },
        async syncLocal(){//还原本地数据
            this.deal_onCreated=false
            await chrome.bookmarks.getTree((c)=> {
                console.log(c,"dd")
                var tee=c[0].children[0].children
                var dels=(data)=>{tee.forEach(item=>{
                    chrome.bookmarks.removeTree(item.id, ()=>{
                        console.log(item.id?item.id:item.node.id,"删除")
                    })
                })}
                dels(tee)
                chrome.storage.local.get("local_bookmark",  v=> {
                    console.log(v.local_bookmark.data[0].children[0].children,"local_bookmark")
                   this.syncData(v.local_bookmark.data[0].children[0].children,v.local_bookmark.data[0].children[0].id) 
                })
            })
            this.deal_onCreated=true
            
        },
        search(){
            switch (this.active) {
                case 0:
                    chrome.tabs.create({url:`chrome://bookmarks/?q=${this.key_word}`, active:true})
                    break;
                case 1:
                    chrome.tabs.create({url:`chrome://history/?q=${this.key_word}`, active:true})
                    break;
                case 2:
                    chrome.tabs.create({url:this.language('lang')==='English'?`http://www.google.cn/search?q=#${this.key_word}`:`https://www.baidu.com/s?wd=${this.key_word}`, active:true})
                    break;
            
                default:
                    break;
            }
            
        },
        language(name){
            return chrome.i18n.getMessage(name)
        }
    }
})

var toast=new Vue({
    el:"#toast",
    data:{
        is_show_template: {"status":false},
        display  : false,
        is_show  : false,
        text_con : ""
    },
    watch:{
        is_show:function(){
            if(this.is_show){
                var that=this
                setTimeout(function(){
                    that.is_show=false
                    setTimeout(function(){
                        that.display=false
                    }, 260)
                }, 2200)
            }
        }
    },
    methods:{
        show(text_con){
            console.log(text_con,"text_con")
            this.text_con = text_con
            this.display  = true
            this.is_show  = true
        }
    }
})


function get_date(){
    var date_obj=new Date()
    let arr=date_obj.toLocaleString().split(":")
    arr.splice(arr.length-1,1)
    return arr.join(":")
}
function post_data(up_url, formData, callback,header){
    var xhr = new XMLHttpRequest()

    xhr.open("POST", "http://127.0.0.1:9988"+up_url, true)
        header&& xhr.setRequestHeader("token", `${header}`);
        xhr.send(formData?JSON.stringify(formData):"")

    xhr.onreadystatechange=function(response){
            if(xhr.status==200){
                
                var data=JSON.parse(xhr.responseText)
                if(callback){
                    callback(data)
                }else{
                    return data
                }
            }else{
                if(callback){
                    callback(null)
                }
            }
    }
}