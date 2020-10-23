import React from "react";
import { Icon, Badge, Popover, List, Tabs, Tag } from "antd";
import './index.less';

// 滚动条
import { Scrollbars } from "components";


const TabPane = Tabs.TabPane;

export default class NoticeIcon extends React.Component {
    render() {
        const listData = [
            {
                id: "000000009",
                title: "任务名称",
                description: "任务需要在 2017-01-12 20:00 前启动",
                extra: "未开始",
                status: "todo",
                type: "待办"
            },
            {
                id: "000000010",
                title: "第三方紧急代码变更",
                description:
                    "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
                extra: "马上到期",
                status: "urgent",
                type: "待办"
            },
            {
                id: "000000011",
                title: "信息安全考试",
                description: "指派竹尔于 2017-01-09 前完成更新并发布",
                extra: "已耗时 8 天",
                status: "doing",
                type: "待办"
            },
            {
                id: "000000012",
                title: "ABCD 版本发布",
                description:
                    "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
                extra: "进行中",
                status: "processing",
                type: "待办"
            }
        ].map(item => {
            if (item.extra && item.status) {
                const color = {
                    todo: "",
                    processing: "blue",
                    urgent: "red",
                    doing: "gold"
                }[item.status];
                item.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {item.extra}
                    </Tag>
                );
            }
            return item;
        });

        const messageContent = (
            <Tabs defaultActiveKey="1" className="tabs">
                <TabPane tab="待办(3)" key="1">
                    <Scrollbars style={{ height: 400 }}>
                        <List
                            className="notice_list"
                            dataSource={listData}
                            renderItem={item => (
                                <List.Item className="item">
                                    <List.Item.Meta
                                        className="meta"
                                        title={
                                            <div className="title">
                                                {item.title}
                                                <div className="extra">
                                                    {item.extra}
                                                </div>
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <div
                                                    className="description"
                                                    title={item.description}
                                                >
                                                    {item.description}
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                        <div className="all">查看全部</div>
                    </Scrollbars>
                </TabPane>
                <TabPane tab="待阅(0)" key="2" />
                <TabPane tab="已办(0)" key="3" />
            </Tabs>
        );

        return (
            <Popover
                placement="bottomRight"
                content={messageContent}
                overlayClassName="noticePopover"
                trigger="click"
            >
                <span className="noticeButtonClass">
                    <Badge count={12}>
                        <Icon type="bell" className="noticeIcon" />
                    </Badge>
                </span>
            </Popover>
        );
    }
}
