import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Layout, Icon, Menu} from 'antd';
import { config } from '../../app/config/global';

export default class Footer extends React.Component {
    constructor() {
        super()
    }
    render() {
        return(
            <div className="page_footer">
                Copyright © 2020-2022 LIANYI TECHNOLOGY CO.,LTD. All Rights Reserved. 一瓢饮（{config.version}}）
            </div>
        )
    }

}