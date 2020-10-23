import {
    createCode,
    checkCode
} from "utils/api";

export default {
    namespace: "code",
    state: {

    },
    effects: {
        // 获取列表信息
        * createCode({payload,callBack}, {put, call, select}) {
            const res = yield call(createCode, {});
            if (res.meta.statusCode === 200) {
                console.log(res)
                callBack && callBack(res)
            }
        },
        * checkCode({payload,callBack}, {put, call, select}) {
            const res = yield call(checkCode, payload);
            if (res.meta.statusCode === 200) {
                if(res.data){
                    window.alert("验证正确！")
                }else {
                    window.alert("验证码错误或已过期！")
                }
            }
        },
        reducers: {
            saveCode(state, {payload: payload}) {
                return {...state, ...payload};
            },
            setState(state, data) {
                return {...state, ...data};
            }
        }
    }
}