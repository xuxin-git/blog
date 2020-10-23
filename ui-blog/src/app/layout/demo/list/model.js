import {
    reqGetXqszXqdmList,
    reqPostXqszXqSave,
    reqPostXqszXqDelete
} from "utils/api";

export default {
    namespace: "list",
    state: {
        data: [],
    },
    effects: {
		// 获取列表信息
        *getDataList({ payload }, { put, call, select }) {
            const res = yield call(reqGetXqszXqdmList, {});
            if (res.state != false) {
                // 设置state
                yield put({
                    type: "saveList",
                    payload: {
                        data: res.rows
                    }
                });
            }
		},
		// 编辑-保存
        *onSave({ value }, { put, call, select }) {
            // 获取state
			const { data } = yield select(({ list }) => list);
			const params = {
				xqdm: value.XQDM,
				xqmc: value.XQMC
			};
			const res = yield call(reqPostXqszXqSave, params);
			if (res.state == true) {
				message.success("更新成功");
				yield put({
					type: "getDataList"
				});
			}
            
		},
		// 删除
        *doDelete({ xqdm }, { put, call, select }) {
            const params = { xqdm };
            const res = yield call(reqPostXqszXqDelete, params);
            if (res.state == true) {
                message.success("删除成功");
                yield put({
                    type: "getDataList"
                });
            }
        }
    },
    reducers: {
        saveList(state, { payload: payload }) {
            return { ...state, ...payload };
        },
        setState(state, data) {
            return { ...state, ...data };
        }
    }
};
