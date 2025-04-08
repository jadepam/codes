class KeepAlive {
  constructor(max) {
    this.max = max || 10  // 最大缓存数
    this.cache = new Map() // 缓存存储
    this.keys = []        // 缓存key数组
  }

  // 渲染函数
  render(h, ctx) {
    const slot = ctx.$slots.default
    if (!slot || slot.length > 1) {
      return slot
    }

    const vnode = slot[0]
    const key = vnode.key || vnode.componentOptions.Ctor.cid
    
    // 如果已缓存，直接返回缓存的组件实例
    if (this.cache.has(key)) {
      vnode.componentInstance = this.cache.get(key).componentInstance
      // 更新key位置
      this._moveToFirst(key)
      return vnode
    }

    // 缓存组件实例
    this.cache.set(key, vnode)
    this.keys.push(key)
    
    // 超出最大缓存数时，删除最久未使用的
    if (this.keys.length > this.max) {
      const lastKey = this.keys[this.keys.length - 1]
      this.cache.delete(lastKey)
      this.keys.pop()
    }

    return vnode
  }

  // 将key移动到数组头部
  _moveToFirst(key) {
    const index = this.keys.indexOf(key)
    if (index > 0) {
      this.keys.splice(index, 1)
      this.keys.unshift(key)
    }
  }
}

// Vue组件形式
export default {
  name: 'KeepAlive',
  abstract: true, // 抽象组件标记
  
  props: {
    max: {
      type: Number,
      default: 10
    }
  },

  created() {
    this.cache = new Map()
    this.keys = []
  },

  destroyed() {
    // 组件销毁时清除缓存
    for (const [key, vnode] of this.cache) {
      const component = vnode.componentInstance
      component && component.$destroy()
    }
    this.cache.clear()
    this.keys = []
  },

  render() {
    const slot = this.$slots.default
    if (!slot || slot.length > 1) {
      return slot
    }

    const vnode = slot[0]
    const key = vnode.key || (vnode.componentOptions && vnode.componentOptions.Ctor.cid)
    
    if (this.cache.has(key)) {
      vnode.componentInstance = this.cache.get(key).componentInstance
      this._moveToFirst(key)
    } else {
      this.cache.set(key, vnode)
      this.keys.push(key)
      if (this.keys.length > this.max) {
        const lastKey = this.keys[this.keys.length - 1]
        const lastVnode = this.cache.get(lastKey)
        // 销毁最久未使用的组件实例
        if (lastVnode.componentInstance) {
          lastVnode.componentInstance.$destroy()
        }
        this.cache.delete(lastKey)
        this.keys.pop()
      }
    }

    return vnode
  },

  methods: {
    _moveToFirst(key) {
      const index = this.keys.indexOf(key)
      if (index > 0) {
        this.keys.splice(index, 1)
        this.keys.unshift(key)
      }
    }
  }
}
