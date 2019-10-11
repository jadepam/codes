// import { router } from 'umi';
export default {
  namespace: 'test',
  state: {
    count:0
  },
  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload }
    },
  },
  effects: {
     *change({payload},{put,select}) {
       const {count}= yield select(state => state.test)
       yield put({
        type: 'save',
        payload:{
          count:payload==="increment"?count+1:count-1
        }
      })
      console.log(count,payload==="increment"?count+1:count-1)
    }
  },
  subscription: {

  }
};
