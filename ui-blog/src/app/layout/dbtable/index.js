import React from "react";
import { connect } from "react-redux";
import {List} from "antd";
import { Button, Divider, Popconfirm, Table } from "antd";
@connect(state => {
    const { tablelist } = state;
    return { ...tablelist };
})
export default class TableList extends React.Component {

    componentDidMount() {
        this.props.dispatch({
            type: "tablelist/getTables"
        });
    }

    render() {
        const {data} = this.props;
        return (
            <div>
                {data}
                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />

            </div>
        );
    }
}

