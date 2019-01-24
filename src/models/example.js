import * as mainServer from '../services/service';

export default {

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res =  yield call(mainServer.query,  payload );
      console.log(res)
      // yield put({ type: 'save' });
    },
  },

  

};
