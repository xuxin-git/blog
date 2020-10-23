import React from "react";
import ReactDOM from "react-dom";
import { LocaleProvider } from "antd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import dva from './redux/dva'
import models from 'models'

const dvaApp = dva.createApp({
	initialState: {},
	models: models,
	onError(e, dispatch) {
		dispatch("sys/error", e);
	},
});
const store = dvaApp.getStore();

// 总路由
// import Container from "./plugins/container/index";
import Container from "./plugins/container/container";

import "../assets/css/global.less";
import "../assets/css/variables.less";

import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import moment from "moment";
moment.locale("zh-cn");

var FastClick = require("fastclick");
import "lodash";

//解决移动端300毫秒延迟
FastClick.attach(document.body);

const render = Component => {
    ReactDOM.render(
        <HashRouter>
            <Provider store={store}>
                <LocaleProvider locale={zh_CN}>
                    <Component />
                </LocaleProvider>
            </Provider>
        </HashRouter>,
        document.getElementById("root")
    );
};

render(Container);
