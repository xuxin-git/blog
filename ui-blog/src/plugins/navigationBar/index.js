import React, { Component, PropTypes } from 'react';
import {  Breadcrumb } from 'antd';
import './index.less'

class NavigationBar extends React.Component{
    constructor() {
        super()
        this.state = {

        }
    }
    render(){
        let menuData=this.props.menuData;
        const curUrl = window.location.href.split('#')[1];
        let breadcrumbList = [];
        for (let i = 0; i < menuData.length; i++) {
            if (menuData[i].children) {
                for (let j = 0; j < menuData[i].children.length; j++) {
                    if (menuData[i].children[j].path == curUrl) {
                        breadcrumbList.push(menuData[i], menuData[i].children[j]);
                        document.title=menuData[i].children[j].name+'-'+'联奕科技'
                    }
                }
            } else {
                if (menuData[i].path == curUrl) {
                    breadcrumbList.push(menuData[i]);
                    document.title=menuData[i].name+'-'+'联奕科技'
                }
            }
        }
        return(
            <div id='Breadcrumb'>
                <Breadcrumb>
                    {breadcrumbList.map(item => (
                        <Breadcrumb.Item key={item.key}>{item.name}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        )
    }
}
export default NavigationBar;