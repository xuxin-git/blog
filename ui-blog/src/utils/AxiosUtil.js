import axios from "axios";
import { Modal, message } from "antd";
import qs from 'qs';
const confirm = Modal.confirm;

window.flag = false; //弹出层标记

// 请求超时[config]:showTimeout    1.[true]:显示提示 2.["again"]:显示再次提示弹出框
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token";
axios.defaults.headers.get["X-Requested-With"] = "XMLHttpRequest"; //Ajax get请求标识
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest"; //Ajax post请求标识
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"; //POST请求参数获取不到的问题
axios.defaults.headers.post["Accept"] = "application/json"; //POST请求参数获取不到的问题
axios.defaults.headers.put["X-Requested-With"] = "XMLHttpRequest"; //Ajax put请求标识
axios.defaults.headers.delete["X-Requested-With"] = "XMLHttpRequest"; //Ajax delete请求标识

axios.interceptors.response.use(
    function(response) {
        // 用户未授权，页面跳转到登录页面
        if (response.status == 401 && response.data.code == "53000010" && !window.loginWarnflag) {
            window.loginWarnflag = true; // 标记当前是否有登录提示弹出框
            const returnUrl = encodeURIComponent(window.location.href); // 登录后需返回的 url
            Modal.warning({
                title: "提示",
                key: "1",
                content: "会话已过期！",
                okText: "重新登录",
                onOk() {
                    // 清空缓存
                    sessionStorage.clear();
                    window.loginWarnflag = false; // 重置
                    // window.location = deployBaseR + `${auth.loginUri}?returnUrl=${returnUrl}`;
                }
            });
        }
        return response;
    },
    function(error) {
		// 请求超时[config]:showTimeout    1.[true]:显示提示 2.["again"]:显示再次提示弹出框
        if (
            error.config.showTimeout &&
            error.code == "ECONNABORTED" &&
            error.message.indexOf("timeout") != -1 &&
            !window.timeoutWarnflag
        ) {
            window.timeoutWarnflag = true; // 标记当前是否有超时提示弹出框
            if (error.config.showTimeout == "again") {
                const timeoutModal = confirm({
                    title: "提示",
                    content: "请求超时是否重试？",
                    onOk: () => {
                        timeoutModal.destroy();
                        window.timeoutWarnflag = false; // 重置
                        return axios.request(error.config);
                    },
                    onCancel: () => {
                        window.timeoutWarnflag = false; // 重置
                    }
                });
            } else {
                message.warning("请求超时!", 3, () => {
                    window.timeoutWarnflag = false; // 重置
                });
            }
        }
        // 用户未授权，页面跳转到登录页面
        if (error.response.status == 401 && error.response.data.code == "53000010" && !window.loginWarnflag) {
            window.loginWarnflag = true; // 标记当前是否有登录提示弹出框
            const returnUrl = encodeURIComponent(window.location.href); // 登录后需返回的 url
            Modal.warning({
                title: "提示",
                key: "1",
                content: "会话已过期！",
                okText: "重新登录",
                onOk() {
                    // 清空缓存
                    sessionStorage.clear();

                    window.loginWarnflag = false; // 重置
                    // window.location = deployBaseR + `${auth.loginUri}?returnUrl=${returnUrl}`;
                }
            });
        }
        return error.response;
    }
);

axios.interceptors.request.use(function(config) {
    // const user = JSON.parse(Cookies.get("user") || "{}");
    // 没有登录跳到登录页
    // if (!user.userName) {
    //     // 排除路径
    //     let isAuthPath = true; // 是否需认证路径
    //     if (auth.excludePaths && auth.excludePaths.length > 0) {
    //         for (let excludePath of auth.excludePaths) {
    //             let regexp = new RegExp(excludePath);
    //             if (regexp.test(config.url)) {
    //                 isAuthPath = false;
    //             }
    //         }
    //     }

    //     if (isAuthPath) {
    //         if (!window.loginWarnflag) {
    //             window.loginWarnflag = true; // 标记当前是否有登录提示弹出框
    //             const returnUrl = encodeURIComponent(window.location.href); // 登录后需返回的 url
    //             Modal.warning({
    //                 title: "提示",
    //                 key: "1",
    //                 content: "会话已过期！",
    //                 okText: "重新登录",
    //                 onOk() {
    //                     // 清空缓存
    //                     sessionStorage.clear();

    //                     window.loginWarnflag = false; // 重置
    //                     window.location = deployBaseR + `${auth.loginUri}?returnUrl=${returnUrl}`;
    //                 }
    //             });
    //         }
    //         return false;
    //     }
    // }

    //添加get请求参数
    if (config.method == "get") {
        config.params = {
            ...config.params,
            _t: Date.parse(new Date()) / 1000
        };
    } else {
        config.params = {
            ...config.params,
            _t: Date.parse(new Date()) / 1000
        };
    }
    return config;
});

export function query(url,params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url,{ params: params})
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

// 导出数据
export function exportDataExcel(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, { ...params }, { responseType: "blob", ...config })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

// 导出模板
export function exportTemplateExcel(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params, responseType: "blob", ...config })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}
//Excel导入post请求会有post参数也可能有get参数,请求的一些系列配置
export function importExcel(url, datas, config) {
    return new Promise((resolve, reject) => {
        axios.post(url,datas,config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

//post请求会有post参数也可能有get参数
export function post(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function postForm(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(datas), { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function get(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function insert(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function update(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function remove(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function requestAll(...paramsFun) {
    return new Promise((resolve, reject) => {
        axios
            .all(...paramsFun)
            .then(
                axios.spread(function(...response) {
                    let responseList = [];
                    for (let res of response) {
                        if (!res.status && res.response) {
                            responseList.push(res.response.data);
                        } else {
                            responseList.push(res.data);
                        }
                    }
                    return responseList;
                })
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}
