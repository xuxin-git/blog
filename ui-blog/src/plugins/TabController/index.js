import React from "react";
import { Tabs, Dropdown, Menu, Icon } from "antd";
import createHistory from "history/createHashHistory";
import './index.less';

var history = createHistory();

const TabPane = Tabs.TabPane;

export default class TabController extends React.Component {
    constructor(props) {
        super(props);
        const { menuData = [] } = props;

        let menuDataArr = [];
        // 处理数据-获取所有path
        const getMenuArr = data => {
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                if (item.path) {
                    if (!item.hide) {
                        menuDataArr.push({
                            name: item.name,
                            path: item.path
                        });
                    }
                    if (item.children && item.children[0]) {
                        getMenuArr(item.children);
                    }
                }
            }
        };
        getMenuArr(menuData);

        this.state = {
            menuDataArr: menuDataArr,
            activeKey: null,
            openList: []
        };
    }

    componentDidMount() {
        const { location } = this.props;
        const activeKey = location.pathname;
        let { menuDataArr = [], openList = [] } = this.state;

        menuDataArr.map(item => {
            if (item.path == activeKey) {
                openList.push(item);
                this.setState({ openList, activeKey });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        let { menuDataArr = [], openList = [] } = this.state;
        if (!location.pathname) {
            return;
        }
        const activeKey = location.pathname;
        let isExist = false;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].path === location.pathname) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            //如果已经存在
            this.setState({
                activeKey
            });
        } else {
            menuDataArr.map(item => {
                if (item.path == activeKey) {
                    openList.push(item);
                    this.setState({ openList, activeKey });
                }
            });
        }
    }

    onChange = activeKey => {
        history.push(activeKey);
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    // 点击移除
    remove = targetKey => {
        let { menuDataArr = [], openList = [], activeKey } = this.state;

        if (openList.length === 1) {
            this.removeAll();
            return false;
        }

        let lastIndex;
        let nextIndex;
        openList.forEach((item, i) => {
            if (item.path === targetKey) {
                lastIndex = i - 1;
                nextIndex = i + 1;
            }
        });

        const newOpenList = openList.filter(item => {
            if (item.path === targetKey) {
                return false;
            } else {
                return true;
            }
        });

        if (activeKey === targetKey) {
            if (openList[lastIndex]) {
                activeKey = openList[lastIndex].path;
                history.replace(openList[lastIndex].path);
            } else if (openList[nextIndex]) {
                activeKey = openList[nextIndex].path;
                history.replace(openList[nextIndex].path);
            }
        }
        this.setState({ openList: newOpenList, activeKey });
    };

    // 移除其他
    removeOther = () => {
        let { openList = [], activeKey } = this.state;
        const newOpenList = openList.filter(item => {
            if (item.path === activeKey) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({ openList: newOpenList });
    };

    // 移除全部
    removeAll = () => {
        console.log("1111");
        this.setState({ openList: [] }, () => {
            history.replace("/");
        });
    };

    renderExtra() {
        const menu = (
            <Menu
                onClick={({ item, key, keyPath }) => {
                    if (key === "other") this.removeOther();
                    if (key === "all") this.removeAll();
                }}
            >
                <Menu.Item key="other">关闭其他选项卡</Menu.Item>
                <Menu.Item key="all">关闭全部选项卡</Menu.Item>
            </Menu>
        );

        return (
            <div className="Tab_Controller_btn">
                <Dropdown overlay={menu} placement="bottomRight">
                    <div className="btn">
                        关闭操作 <Icon type="down" />
                    </div>
                </Dropdown>
            </div>
        );
    }
    render() {
        let { openList = [], activeKey } = this.state;

        return (
            <div className="Tab_Controller">
                <Tabs
                    key={openList.length}
                    className="Tab_List"
                    hideAdd
                    onChange={this.onChange}
                    activeKey={activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    tabBarExtraContent={this.renderExtra()}
                >
                    {openList.map(item => (
                        <TabPane
                            tab={item.name}
                            key={item.path}
                            style={{
                                display: "none"
                            }}
                        />
                    ))}
                </Tabs>
            </div>
        );
    }
}
