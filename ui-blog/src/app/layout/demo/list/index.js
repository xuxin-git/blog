import React from "react";
import { connect } from "react-redux";
import { Button, Divider, Popconfirm, Table } from "antd/lib/index";

class PageList extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: "list/getDataList",
            payload: {}
        });
    }

    // 保存
    save(value) {
        this.props.dispatch({
            type: "list/onSave",
            value: value
        });
    }

    // 新增
    handleAdd(value) {
        this.props.dispatch({
            type: "list/onSave",
            value: value
        });
    }

    // 删除
    doDelete(xqdm) {
        this.props.dispatch({
            type: "list/doDelete",
            xqdm: xqdm
        });
    }

    render() {
        let { data } = this.props;
        const columns = [
            {
                title: "校区代码",
                dataIndex: "XQDM",
                key: "XQDM"
            },
            {
                title: "校区名称",
                dataIndex: "XQMC",
                key: "XQMC"
            },
            {
                title: "操作",
                key: "action",
                render: (text, item) => {
                    return (
                        <span>
                            <Popconfirm
                                title="确定要删除吗?"
                                onConfirm={() => this.doDelete(item.XQDM)}
                            >
                                <a>删除</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a onClick={() => this.edit(item)}>编辑</a>
                        </span>
                    );
                }
            }
        ];

        return (
            <div>
                <div className="operation-btns">
                    <Button type="primary" onClick={() => this.handleAdd()}>
                        新增
                    </Button>
                </div>
                <Table loading={false} columns={columns} dataSource={data} />
            </div>
        );
    }
}

function mapStateToProps(state) {
	const { list, loading } = state;
	console.log(list, "list");
	console.log(state, 'state')
    return {
        loading,
        ...list
    };
}

export default connect(mapStateToProps)(PageList);
