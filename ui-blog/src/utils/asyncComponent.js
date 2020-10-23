/**
 * 使用react-loadable按需加载
 * @Author: qizc
 * @Date:   2018-09-18 14:37:52
 * @Last Modified by:   qizc
 * @Last Modified time: 2018-10-10 11:53:20
 */
"use strict";

import React from "react";
import Loadable from "react-loadable";
import Loading from "./Loading";

export default function asyncComponent(opts) {
    const { app, models, ...otherOpts } = opts;
    return Loadable(
        Object.assign(
            {
                loading(props) {
                    return <Loading {...props} />;
                },
                delay: 200,
                timeout: 10000,
                render(loaded, props) {
                    return (
                        <Loading models={models} app={app}>
                            {React.createElement(loaded.default, props)}
                        </Loading>
                    );
                }
            },
            otherOpts
        )
    );
}

// 按需加载写法（备用）
// export default function asyncComponent(importComponent) {
//     class AsyncComponent extends React.Component {
//         constructor(props) {
//             super(props);
//             this.state = {
//                 component: null
//             };
//         }
//         async componentDidMount() {
//             const { default: component } = await importComponent();
//             this.setState({ component });
//         }
//         render() {
//             const C = this.state.component;
//             return C ? <C {...this.props } /> : null;
//         }
//     }
//     return AsyncComponent;
// }
//
//
// 用法
// const NoticeType = asyncComponent(() => import('../pages/notice/noticeType'))
// const NoticeInfo = asyncComponent(() => import('../pages/notice/noticeInfo'))
