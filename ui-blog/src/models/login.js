import { reqPostLogin } from "utils/api";
import createHistory from 'history/createHashHistory'
import { Modal } from "antd";

var history = createHistory();

const initState = sessionStorage.getItem("userLogin")
    ? { data: JSON.parse(sessionStorage.getItem("userLogin")) }
    : {
          data: {}
      };

export default {
    namespace: "login",
    state: {
        ...initState
    },
    effects: {
        *fetchLogin({ payload: formData }, { put, call, select }) {
			// 发起登录请求
			const res = yield call(reqPostLogin, formData);
            if (res.state != false) {
                yield put({
                    type: "setData",
                    payload: {
                        ...formData,
                        data: res
                    }
				});
				sessionStorage.setItem("userLogin", JSON.stringify(res));
				// 跳转首页
				history.push('/index')
            } else {
                Modal.error({
                    title: "登录失败",
                    content: "账号或者密码有误！"
                });
                yield put({
                    type: "clearData"
                });
            }
        },
        *fetchLoginOut({}, { put, call, select }) {
            // 清除缓存
            sessionStorage.clear();
            yield put({
                type: "clearData"
			});
			// 跳转登录页
			history.push('/login')
            // Modal.error({ title: "登出失败", content: res.message });
        }
    },
    reducers: {
        setData(state, { payload: payload }) {
            return { ...state, ...payload };
        },
        clearData(state, {}) {
            return { data: {} };
        }
    }
};
