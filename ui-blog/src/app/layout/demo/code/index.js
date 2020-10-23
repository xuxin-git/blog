import React from "react";
import { connect } from "react-redux";
import {Button, Col, Input, Row, Statistic} from "antd";

@connect(state => {
    const { code } = state;
    return { ...code };
})
export default class TheCode extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data: {},
            buttonValue:"生成验证码",
            disabled: false,
            outTime: 0,
            inputValue: ''
        }
    }
    CreateCode() {
        this.props.dispatch({
            type: "code/createCode",
            callBack: res=>{
                this.setState({
                    data: res.data,
                    buttonValue: res.data.outTime-50+"秒后可重新获取",
                    disabled: true,
                    outTime: res.data.outTime
                },()=>{
                    this.countFun();
                })
            }
        });
    }

    countFun = () => {
        this.timer = window.setInterval(() => {
            this.setState({
                outTime: this.state.outTime - 1,

            }, () => {
                console.log("----------",this.state.outTime)
                if (this.state.outTime === 0) {
                    this.setState({
                        buttonValue: "生成验证码",
                        disabled: false
                    })
                    window.clearInterval(this.timer)
                }else {
                    this.setState({
                        buttonValue: this.state.outTime+"秒后可重新获取",
                    })
                }
            })
        }, 1000)
    }
    checkCode=()=>{
        this.props.dispatch({
            type: "code/checkCode",
            payload: {
                code: this.state.inputValue
            }
        });
    }
    inputChange= (e)=>{
        this.setState({
            inputValue: e.target.value
        })
    }
    render() {
        const {data, disabled, buttonValue, outTime} = this.state
        return (
            <div>
                <Row>
                    <Col span={5}><Input onChange={e=>{this.inputChange(e)}} /></Col>
                    <Col span={3}>
                        <Button type="primary" disabled={disabled} onClick={()=>this.CreateCode()}>
                            {buttonValue}
                        </Button>
                    </Col>
                </Row>
                <Button type="primary" onClick={()=>{this.checkCode()}}>确定</Button>
                <span>{data.code}</span>
            </div>
        );
    }
}

