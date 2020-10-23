import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import { DragModal } from '../../components';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible1: false,
            visible: false
        }
    }

    render() {
        const { visible, visible1 } = this.state;

        return (
			
            <div className="home">
                <Button
                    type="primary"
                    onClick={() => {
                        this.setState({
                            visible: true
                        });
                    }}
                >
                    Open
                </Button>
                <DragModal
                    visible={visible}
                    title="Title"
                    onCancel={() => {
                        this.setState({
                            visible: false
                        });
                    }}
                    footer={[
                        <Button
                            key="submit"
                            type="primary"
                            size="large"
                            onClick={() => {
                                this.setState({
                                    visible1: true
                                });
                            }}
                        >
                            Next
                        </Button>
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </DragModal>
                <DragModal
                    drag={false}
                    visible={visible1}
                    onCancel={() => {
                        this.setState({
                            visible1: false
                        });
                    }}
                    title="Title222"
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </DragModal>
            </div>
        );
    }
}
