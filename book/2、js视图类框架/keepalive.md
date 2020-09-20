> 预期：vue全项目实现页面前进缓存，后退不缓存页面。

### 分析

1、通用场景

通用：前进缓存，后退不缓存；

前进：向 **未访问** 的页面跳转 && 父-》子；同级跳转 

后退：相反，跳转至**上一次**访问的页面

特殊情况：跳转三方页面后的返回，页面刷新

例子：

A->B->C

C->B 读取B缓存

C->A 不缓存

2、细粒度场景：（更好的兼容复杂场景）

细粒度：router设置keepAlive属性设置页面是否缓存（默认全部缓存）

url传值细粒度控制：

强制更新，isUpdata=true，例：this.$router.push({ name: 'Index', params: { isUpdata: true }, replace: true })

强制缓存，isCache=true，例：this.$router.push({ name: 'Index', params: { isCache: true }, replace: true })

优先级：细粒度大于通用

3、页面滚动

路由离开前，如果是前进则vuex存储当前页面scrolltop；组件activated，取并设置scollTop

### 实现思路

keepalive，include属性，通过判断当前页存储router页面name

router，path定义页面层级，首页为顶级''/"

**### 7、keepalive：**

```js
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../views/index.vue'),
    meta: {
      title: '本地生活',
    }
  },
    {
    path: '/goods-list',
    name: 'goods-list',
    component: () => import(/* webpackChunkName: "goodsList" */'../views/goods/listnew.vue'),
    meta: {
      title: '搜索结果',
    }
  },
   {
    path: '/goods-list/shop-detail',
    name: 'shop-detail',
    component: () => import(/* webpackChunkName: "ShopDetail" */'../views/goods/shopDetail.vue'),
    meta: {
      title: '详情',
    }
  },
```

```js
//刷新场景判断
router.afterEach(async (to, from) => {
  if (from.name === null) { // 当前页面刷新
    store.commit('newCachePath', { path: [] })
  }
})
//页面路由离开前，判断跳转类型
async beforeRouteLeave (to, from, next) {
    let cachePath = this.$store.state.commData.cachePath
    const _findex = cachePath.findIndex((a) => a === to.name)
    const formLevel = from.path.split('/').filter(r => r).length
    const toLevel = to.path.split('/').filter(r => r).length
    // 前进：父-》子；同级跳转
    // 后退：相反
    console.log(_findex, cachePath, '>>>cachePath', from.path, to.path, formLevel, toLevel)
    if ((_findex !== -1 && _findex + 2 < cachePath.length) || to.params.isUpdata || to.query.isUpdata) {
      cachePath.splice(_findex)
      console.log(to.params.isUpdata || to.query.isUpdata ? '强刷' : '隔空跳转', cachePath)
    } else if (_findex === -1 && formLevel <= toLevel) {
      const position = getScroll().top// 获取页面滚动位置
      console.log('前进', position)
      this.$store.commit('SETSCROLL_POSITION', position)// 滚动缓存逻辑
      cachePath = Array.from(new Set([...cachePath, from.name]))
    } else if (_findex !== -1 && _findex + 1 === cachePath.length && formLevel >= toLevel) {
      console.log('后退', cachePath)
    } else {
      cachePath.splice(_findex)
      console.log('啥都不是', cachePath)
    }
    await this.$store.commit('newCachePath', { path: cachePath })// 前进

    next()
  }
	//滚动恢复
  async activated () {
    setScroll(this.$store.state.user.scrollPosition)// 设置滚动
  },
    
```

公共方法

```js
export const getScroll = () => {
  return {
    left: document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset || 0,
    top: document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0
  }
}
export const setScroll = (v, type = 'top') => {
  if (type === 'top') {
    document.documentElement.scrollTop = v
    document.body.scrollTop = v
    window.pageYOffset = v
  } else {
    
    document.documentElement.scrollLeft = v
    document.body.scrollLeft = v
    window.pageXOffset = v
  }
}
```



### 注意点

​	1、页面滚动的场景，需单独处理；（值得注意的：移动端scroll兼容性写法）

​	2、部分表单页面，使用keepalive后输入框会有缓存，需手动清除

​	3、页面里嵌套子组件，在keepalive的情况下无法获取子组件里的最新数据。

如：子组件需获取最新数据，可通过v-if子组件+页面activated设置true+deactivated设置false，让组件重新渲染。

​	4、watch：执行在activated之前，故需加判断条件，如缓存则不执行

