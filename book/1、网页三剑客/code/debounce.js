function debounce(fn,delay){
    let time=null
    return ()=>{
        if(time){
            clearInterval(time)
        }
        time = setTimeout(fn,delay)
    }
}

function throttle(fn,delay) {
    let canRun = true; // 通过闭包保存一个标记
    return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
            fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
            canRun = true;
        }, delay);
    };
}

function bind(thisArg){
   let arg= Array.prototype.slice.call(arguments,1)//arguments
    return function(){
        return this.apply(thisArg,arg.concat(Array.prototype.slice.call(arguments)))
    }
}