import React from "react";
import { Route, Router, Link, Redirect, Switch } from "react-router-dom";
import { getMenuData } from "./menu";

const menuData = getMenuData();

export default class AppRoute extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
		const location = this.props.location;
		// 遍历菜单生成路由
        const getRouter = item => {
            if (item.children && item.children != "") {
                return item.children.map((itemM, i) => {
                    return getRouter(itemM);
                });
            } else {
                return (
                    <Route
                        key={item.key}
                        location={location}
                        path={item.path}
                        component={item.component}
                    />
                );
            }
		};
		
        return (
			<Switch
				location={location}
				key={location.pathname.split("/")[1]}
			>
				{menuData.map((item, index) => getRouter(item, index))}
			</Switch>
        );
    }
}
