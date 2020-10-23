import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react'

const { Meta } = Card;

class Leftcard extends React.Component {
    state = {
    };


    render() {

        return (
            <>
                <Card style={{ width: 300, marginTop: 16 }}>
                    <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description="This is the description"
                    />
                </Card>

                <Card
                    style={{ width: 300, marginTop: 16 }}

                >
                    <Skeleton avatar active>
                        <Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Skeleton>
                </Card>
            </>
        );
    }
}


export default Leftcard