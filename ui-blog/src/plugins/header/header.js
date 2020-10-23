import React from "react";
import { Route, Router, Link } from "react-router-dom";
import {
    Menu,
    Icon,
    Layout,
    Row,
    Col,
    Dropdown,
    Popover,
    Button,
    Avatar,
    Badge,
    List,
    message,
    Tabs,
    Tag
} from "antd";

import { connect } from "react-redux";
import "./index.less";

import NoticeIcon from "../noticeIcon";

import touxiang from "../../../assets/images/Biazfanxmam.png";

import SideBar from "app/route/sidebar"; // 侧边栏




const themeColor = [
    "#F5222D",
    "#FA541C",
    "#FA8C16",
    "#FAAD14",
    "#FADB14",
    "#A0D911",
    "#52C41A",
    "#13C2C2",
    "#1890FF",
    "#2F54EB",
    "#722EEB",
    "#EB2F96"
];

const { Header } = Layout;
const TabPane = Tabs.TabPane;

@connect(state => {
    let { login } = state;
    return { login };
})
export default class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            themeLi: themeColor,
            themeNum: 0,
            collapsed: false,
            logoWidth: "255px",
            userLogin: props.login.data
        };

        this.changeSidebar = this.changeSidebar.bind(this);
    }

    componentWillMount() {
        let that = this;
        this.state.themeLi.map((item, index) => {
            if (item == localStorage.getItem("themeType")) {
                that.setState({
                    themeNum: index
                });
            }
        });
    }

    // 登录
    handleClick(e) {
        if (e.key == "logout") {
            this.props.dispatch({
                type: "login/fetchLoginOut"
            });
        }
    }

    // 改变侧边栏
    changeSidebar = () => {
        let width = "255px";
        if (!this.state.collapsed) {
            width = "80px";
        }

        this.setState({ collapsed: !this.state.collapsed, logoWidth: width });

        if (this.props.toggle) {
            this.props.toggle();
        }
    };

    // 切换主题色
    changeTheme = (item, index) => {
        this.setState({
            themeNum: index
        });
        this.props.changeTheme(item);
        localStorage.setItem("themeType", item);
        let initialTheme = {
            "@primary-color": item,
            "@layout-header-background": item
        };

        window.less
            .modifyVars(initialTheme)
            .then(() => {
                localStorage.setItem("app-theme", JSON.stringify(initialTheme));
            })
            .catch(error => {
                message.error(`Failed to update theme`);
            });
    };

    render() {
        const { userLogin } = this.state;

        const menu = (
            <Menu
                className="menu"
                selectedKeys={[]}
                onClick={this.handleClick.bind(this)}
            >
                <Menu.Item disabled>
                    <Icon type="user" />
                    个人中心
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />
                    设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
            </Menu>
        );
        let themeList = [];
        this.state.themeLi.map((item, index) => {
            themeList.push(
                <label
                    style={{ backgroundColor: item }}
                    key={index}
                    onClick={() => this.changeTheme(item, index)}
                >
                    {this.state.themeNum == index && <Icon type="check" />}
                </label>
            );
        });
        const themeContent = (
            <Menu
                style={{ width: "200px", height: "auto" }}
                className="theme_ul"
            >
                <Menu.Item key="0">
                    <div className="theme_title" onClick={this.changeNewTheme}>
                        切换主题
                    </div>
                    <div className="theme_ul">{themeList}</div>
                </Menu.Item>
            </Menu>
        );

        return (
            <Header className="page_header">
                <Row>
                    <div className="page_header">
                        <Col span={4}/>
                        <Col span={16} style={{ textAlign: "center" } }>
                            <div className="page_header"><SideBar/></div>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <div className="top-nav">
                                <NoticeIcon />
                                <Dropdown
                                    overlay={themeContent}
                                    placement="bottomLeft"
                                    trigger={["click"]}
                                >
                                <span className="noticeButtonClass">
                                    <Icon
                                        type="setting"
                                        className="settingIcon"
                                    />
                                </span>
                                </Dropdown>
                                <Dropdown overlay={menu}>
                                <span className="action account">
                                    <Avatar
                                        size="small"
                                        className="avatar"
                                        src={touxiang}
                                    />
                                    <span className="name">
                                        {userLogin.userName || "管理员"}
                                    </span>
                                </span>
                                </Dropdown>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Header>
        );
    }
}
