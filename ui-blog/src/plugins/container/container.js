import React from "react";
import { connect } from "react-redux";
import { Route, Router, Link, Redirect, Switch } from "react-router-dom";
import { Layout, Icon, Menu, Col} from "antd";
import createHistory from "history/createHashHistory";
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Scrollbars } from "components";
import asyncComponent from "utils/asyncComponent"; //按需加载组件

/*工具类*/
import { getSize } from "../../utils/util";

/*数据*/
import { getMenuData } from "app/route/menu"; //左侧菜单数据
import AppRoute from "app/route/route"; // 菜单路由
import SideBar from "app/route/sidebar"; // 侧边栏

/*公用组件*/
// import NavigationBar from '../navigationBar'
import TabController from "../TabController";
import Footer from "../footer/index";
// import Top from "../header/index";
import Top from "../header/header";

/*图片*/
import logo_expanded from "images/logo-m.png";
import logo_collapsed from "images/logo-s.png";
import bg from "../../../assets/images/bg.png";
import Leftcard from "../../app/layout/letfCard";

/********************公共页面-开始***************************/
const commonRoute = [
    {
        path: "/login", // 登录页面
        exact: true,
        component: asyncComponent({
            loader: () => import("src/plugins/login")
        })
    }
];
/********************公共页面-结束***************************/

const { Sider, Content } = Layout;
var history = createHistory();
const menuData = getMenuData();

@connect(state => {
    const { login } = state;
    return { login };
})
export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientHeight: getSize().windowH // 屏幕高度
        };

    }
    componentDidMount() {
        window.addEventListener("resize", this.resize, false);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    // 重置高度
    resize = () => {
        this.setState({
            clientHeight: getSize().windowH
        });
    };

    render() {
        const { collapsed, clientHeight } = this.state;

        return (
            <Router history={history}>
                <Route
                    render={({ location }) => {
                        console.log("location",location)
                        return (
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    minWidth: "1360px",
                                    backgroundImage: `url(${bg})`
                                }}
                            >
                                <Switch location={location}>
                                    <Route
                                        location={location}
                                        exact
                                        path="/"
                                        render={() => <Redirect to="index" />}
                                    />
                                    {/* 公共路由 */}
                                    {commonRoute.map(item => {
                                        const {
                                            path,
                                            component,
                                            ...other
                                        } = item;
                                        return (
                                            <Route
                                                location={location}
                                                path={path}
                                                key={path}
                                                component={component}
                                                {...other}
                                            />
                                        );
                                    })}
                                    {/* 页面路由 */}
                                    <Route
                                        location={location}
                                        render={({ location }) => {
                                            return (
                                                <Layout
                                                    style={{ height: "100%" }}
                                                >
                                                    <Layout>
                                                        {/* 头部公用组件 */}
                                                        <Top
                                                            collapsed={
                                                                collapsed
                                                            }
                                                            toggle={this.toggle}
                                                            changeTheme={
                                                                this.changeTheme
                                                            }
                                                        />
                                                        <div>
                                                            <Col span={6}>
                                                                {/*<LeftCard/>*/}
                                                                <div style={{marginLeft:160}}>
                                                                    <Leftcard/>
                                                                </div>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Content
                                                                    className="page_content"
                                                                    style={{
                                                                        height:
                                                                            clientHeight -
                                                                            130 -
                                                                            20
                                                                    }}
                                                                >
                                                                    {/* 路由设置 页面显示区域 */}
                                                                    <Switch
                                                                        location={
                                                                            location
                                                                        }
                                                                        key={
                                                                            location.pathname.split(
                                                                                "/"
                                                                            )[1]
                                                                        }
                                                                    >
                                                                        <AppRoute
                                                                            location={
                                                                                location
                                                                            }
                                                                        />
                                                                    </Switch>
                                                                </Content>
                                                            </Col>
                                                            <Col span={6}>

                                                            </Col>
                                                        </div>



                                                        <Footer />
                                                    </Layout>
                                                </Layout>
                                            );
                                        }}
                                    />
                                </Switch>
                            </div>
                        );
                    }}
                />
            </Router>
        );
    }
}
