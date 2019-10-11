//react hooks api + dvajs 实例
/* eslint-disable */
import React, { Component,createContext,memo,useState, useEffect,useContext,useReducer,useCallback,useMemo,useRef,useImperativeHandle,useLayoutEffect,useDebugValue, } from 'react';
import { connect } from 'dva';

/*
* 两种state管理的hook：useState、useReducer

*useState(): 返回一个 state，以及更新 state 的函数
在初始渲染期间，返回的状态 (state) 与传入的第一个参数值相同。
setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

*useReducer: 它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法
其中reducer函数，需return新的state对象


*useContext：接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context

* memo,react 16.6新增的方法 React.memo() 可以和 functional component一起使用，局部渲染更新
调用了 useContext 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大，你可以 通过使用 memoization 来优化。

* useEffect
两个参数，第一个参数为回调方法；第二个参数为执行条件，该值改变后才会重新执行，[]空数组时只执行一次 
useEffect会延迟调用，执行时间为组件渲染完成后，不应在函数中执行阻塞浏览器更新屏幕的操作
作用：管理这些副作用（side-effects）的地方，例如：获取数据、手动操作 DOM、订阅一个流（RxJS）


*useCallback&useMemo：
useCallback和useMemo的参数跟useEffect一致，他们之间最大的区别有是useEffect会用于处理副作用，而前两个hooks不能。
useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。
useCallback:返回一个 memoized 回调函数，两个参数，回调函数，执行条件
useMemo:返回一个 memoized 值
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

*useRef

*useImperativeHandle

*useLayoutEffect

*useDebugValue

*/

//useContext&memo
const FormContext = createContext();
const FormProvider = ({ initialValues, children }) => {
  const [values, setValues] = useState(initialValues);

  const value = {
    values,
    setValues
  };
  // console.log(initialValues, children,"initialValues, children")
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

const TextField = memo(
  ({ name, value, setValues }) => {
    console.log(name, value);
    return (
      <input
        type="text"
        value={value}
        onChange={e => {
          e.persist();
          setValues(prev => ({
            ...prev,
            [name]: e.target.value
          }));
        }}
      />
    );
  },
  (prev, next) => prev.value === next.value
);

const Field = ({ name }) => {
  const { values, setValues } = useContext(FormContext);

  const value = values[name];

  return <TextField name={name} value={value}  setValues={setValues} />;
};


//useCallback&useMemo
const set = new Set();



const Counter = (props)=> {

  const [count, setCount] = useState(0);
  // useEffect:Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("i am useEffect, i will done when props.count change",props.count)
  },
  [props.count]
  );
  const chageProps=async (type)=>{
    await  props.dispatch({
      type:'test/change',
      payload: type
    })
    await setCount(count + 1)  
  }
  

//useReducer
const init=(initialCount) => {
  return {count: initialCount};
}
 const reducer=(state, action)=> {//state, action
    let reCount=state.count
    if(action.type==='increment'){
      reCount=state.count +1
    }else if(action.type==='decrement'){
      reCount=state.count -1
    }else if(action.type==='reset'){
      reCount=0
    }
    props.dispatch({type: 'test/save',payload:{
      count:reCount
    }})
    return {count:reCount}
  }

  const [state, dispatch] = useReducer(reducer, props.count, init);
//Callback

const [Callback, setCallback] = useState(1);
  const [val, setVal] = useState(0);

  const callback = useCallback(() => {
      console.log(Callback);
  }, [Callback]);
  set.add(callback);
  return (
    <>
    <div>
    <h1>1、useState&useEffect</h1>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => chageProps('increment')}>
        {/* <button onClick={() => setCount(count + 1)}> */}
          Click me
        </button>
    </div> 
    </div>


    <div>
    <h1>2、createContext&memo:使用memoization优化组件渲染</h1>
    <FormProvider initialValues={{ firstName: "Marr", lastName: "Keri" }}>
      <Field name="firstName"/>
      <Field name="lastName"/>
    </FormProvider>
    
  </div>
    <div>
    <h1>3、useReducer</h1>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: 0})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>

    <div>
    <h1>4、Callback</h1>
    <h4>{Callback}</h4>
        <h4>{set.size}</h4>
        <h4>{val}</h4>
        <div>
            <button onClick={() => setCallback(Callback + 1)}>+</button>
            <input value={val} onChange={event => setVal(event.target.value)}/>
        </div>
    </div>
</>
  );
}


// @connect( s => ({...s['test']}))
//class类方法add
// class page extends Component {
//   constructor(props){
//     super(props);
//     this.props.dispatch({type:'change',payload: 'increment'})
//   }
//   change(type){
//     this.props.dispatch({type:'test/change',payload: type})
//   }
//   render() {
//       return(
//         <>
//       Count: {this.props.count}
//       <button onClick={() => this.change('increment') }>+</button>
//       <button onClick={() => this.change('decrement')}>-</button>
//     </>
//     )
//   }
// }
// export default page

export default connect( s => ({...s['test']}))(Counter)


