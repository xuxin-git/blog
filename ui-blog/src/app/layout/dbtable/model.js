import {
    getDbTables
} from "utils/api";

export default {
    namespace: "tablelist",
    state: {
        data: [],
    },
    effects: {
		// 获取列表信息
        *getTables({ payload }, { put, call, select }) {

            const res = yield call(getDbTables,{});

            if (res.state != false) {
                yield put({
                    type: "saveTable",
                    payload: {
                        data: res.data
                    }
                });
                console.log('------------------',res)
            }
		},

    },
    reducers: {
        saveTable(state, { payload: payload }) {
            return { ...state, ...payload };
        },
        setState(state, data) {
            return { ...state, ...data };
        }
    }
};
