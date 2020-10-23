import { getMenuData } from "./menu";
import React from "react";
import { Icon, Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const menuData = getMenuData();

export default class SideBar extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            collapsed: false
        }
    }

    render() {
		// props传递参数控制开关
		let { collapsed } = this.state;
		const {newCollapsed} = this.props;
        if (newCollapsed!=undefined){
            collapsed=newCollapsed;
		}
        const reg = /^\/[\W\w]+[^?]/g;
        let menuItemUrl = location.hash.split("#")[1].match(reg);

        let subMenuUrl = menuItemUrl[0].split("/");
        subMenuUrl.pop();
        subMenuUrl.shift();
        subMenuUrl = subMenuUrl.map(item => {
            return "/" + item;
        });
        let arr = [];
        for (var i = 0; i < subMenuUrl.length; i++) {
            let str = "";
            for (var j = 0; j < i + 1; j++) {
                str += subMenuUrl[j];
            }
            arr.push(str);
        }
        
        const getMenu = item => {
            if (item.children && item.children != "") {
                let htmlct = [];
                let menuItem = item.children.map((item, i) => {
                    return getMenu(item);
                });
                htmlct.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {menuItem}
                    </SubMenu>
                );
                return htmlct;
            } else {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.path}>
                            {item.icon ? <Icon type={item.icon} /> : ""}
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        };
        return (
            <Menu
                theme="light"
                // mode="inline"
                mode="horizontal"
                defaultSelectedKeys={menuItemUrl}
                defaultOpenKeys={arr}
				inlineCollapsed={collapsed}
            >
                {menuData.map((item, index) => getMenu(item, index))}
            </Menu>
        );
    }
}

