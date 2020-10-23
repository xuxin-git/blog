/**
 * Loading--页面加载loading
 * @Author: qizc
 * @Date:   2018-09-17 15:37:45
 * @Last Modified by:   qizc
 * @Last Modified time: 2018-10-10 14:31:46
 */
"use strict";
import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import dynamic from "../redux/dynamic";
import QueueAnim from 'rc-queue-anim';

class _Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadModels: true
        };
	}
	
	componentWillMount(){
		this.load();
	}

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    // 先加载model
    load = () => {
        const { models, app } = this.props;
        dynamic({
            app,
            models: models
        }).then(() => {
            if (this.mounted) {
                this.setState({ loadModels: false });
            } else {
                this.state.loadModels = false;
            }
        });
    };

    render() {
        const { children, pastDelay, error, isLoading } = this.props;
        const { loadModels } = this.state;

        if (error) {
            console.log(error);
            return (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%"
                        }}
                    >
                        Error!
                    </div>
                </div>
            );
        } else if (pastDelay) {
            return (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        position: "relative"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%"
                        }}
                    >
                        <Spin />
                    </div>
                </div>
            );
        }

        if (children && !isLoading && !loadModels) {
            // return (
            //     <div
            //         key="page"
            //         style={{
            //             height: "100%",
            //             width: "100%"
            //         }}
            //     >
            //         {children}
            //     </div>
            // );
            return (
                <QueueAnim
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
					className="queueAnim"
                    duration={800}
                    onEnd={() => {
                        // 完成后设置transform为默认值
                        const queueAnimList = document.getElementsByClassName("queueAnim");
                        for (let index = 0; index < queueAnimList.length; index++) {
                            const element = queueAnimList[index];
                            element.querySelector("div").style.transform = "inherit";
                        }
                    }}
                >
                    <div
                        key="page"
                        style={{
                            height: "100%",
                            width: "100%"
                        }}
                    >
                        {children}
                    </div>
                </QueueAnim>
            );
        }
        return null;
    }
}

export default _Loading;
