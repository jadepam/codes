class LRUCache{
    constructor(capacity){
        this.capacity=capacity
        this.cache=new Map()
    }
    put(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key) && this.cache.set(key, value);
        } else if (this.cache.size >= this.capacity){
            // 缓存超过最大值，则移除最近没有使用的
            this.cache.delete(this.cache.keys().next().value)
        }
        this.cache.set(key, value);
        return this.cache
    }
    get(key){
        if(this.cache.has(key)){
            const v=this.cache.get(key)
            this.cache.delete(key) && this.cache.set(key, v);
            return v
        }else{
            return -1
        }
    }
}