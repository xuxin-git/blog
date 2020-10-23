import React from "react";
import {
    Form,
    Icon,
    Modal,
    Input,
    Button,
    Checkbox,
    Tabs,
    Row,
    Col
} from "antd";
import { connect } from "react-redux";

import Footer from "../footer/index";

const { TabPane } = Tabs;
const FormItem = Form.Item;

import styles from "./index.less";
import logo from "../../../assets/images/logo-l.png";
import bg from "../../../assets/images/bg.png";

@connect(state => {
	let { login } = state;
    return { login };
})
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "tab1",
            active: {},
            count: 0
        };
    }

    handleAccountSubmit = e => {
        e.preventDefault();
        if (this.state.type === "tab1") {
            this.props.form.validateFields(
                ["userName", "password"],
                { force: true },
                (err, values) => {
                    if (!err) {
                        this.props.dispatch({
                            type: "login/fetchLogin",
                            payload: {
                                ...values
                            }
                        });
                    } else {
                        Modal.error({
                            title: "登录",
                            content: "用户账号、密码不能为空！"
                        });
                    }
                }
            );
        } else {
        }
    };

    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };

    render() {
        const { type, count } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div
                className={styles.loginPage}
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className={styles.content}>
                    <header style={{ marginBottom: 40, textAlign: "center" }}>
                        <a href="javascript:;">
                            <img alt="logo" src={logo} />
                        </a>
                    </header>
                    <div className={styles.main}>
                        <Tabs
                            className={styles.tabs}
                            animated={false}
                            defaultActiveKey={type}
                        >
                            <TabPane tab="账号密码登录" key="tab1">
                                <Form onSubmit={this.handleAccountSubmit}>
                                    <FormItem>
                                        {getFieldDecorator("userName", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入您的账号！"
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                prefix={
                                                    <Icon
                                                        type="user"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                placeholder="请输入用户名"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator("password", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入密码！"
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                prefix={
                                                    <Icon
                                                        type="lock"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                type="password"
                                                placeholder="请输入密码"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator("remember", {
                                            valuePropName: "checked",
                                            initialValue: true
                                        })(<Checkbox>记住登录</Checkbox>)}
                                        <a
                                            style={{ float: "right" }}
                                            href="javascript:;"
                                        >
                                            忘记密码
                                        </a>
                                    </FormItem>
                                    <FormItem>
                                        <Button
                                            className={styles.submit}
                                            type="primary"
                                            size="large"
                                            htmlType="submit"
                                        >
                                            登录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane tab="手机号登录" key="tab2">
                                <Form>
                                    <FormItem>
                                        {getFieldDecorator("mobile", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入手机号！"
                                                },
                                                {
                                                    pattern: /^1\d{10}$/,
                                                    message: "手机号格式错误！"
                                                }
                                            ]
                                        })(
                                            <Input
                                                size="large"
                                                prefix={
                                                    <Icon
                                                        type="mobile"
                                                        style={{
                                                            color:
                                                                "rgba(0,0,0,.25)"
                                                        }}
                                                    />
                                                }
                                                placeholder="手机号"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Row gutter={8}>
                                            <Col span={16}>
                                                {getFieldDecorator("captcha", {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                "请输入验证码！"
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        size="large"
                                                        prefix={
                                                            <Icon
                                                                type="mail"
                                                                style={{
                                                                    color:
                                                                        "rgba(0,0,0,.25)"
                                                                }}
                                                            />
                                                        }
                                                        placeholder="验证码"
                                                    />
                                                )}
                                            </Col>
                                            <Col span={8}>
                                                <Button
                                                    size="large"
                                                    disabled={count}
                                                    className={
                                                        styles.getCaptcha
                                                    }
                                                    onClick={this.onGetCaptcha}
                                                >
                                                    {count
                                                        ? `${count} s`
                                                        : "获取验证码"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator("remember", {
                                            valuePropName: "checked",
                                            initialValue: true
                                        })(<Checkbox>记住登录</Checkbox>)}
                                        <a
                                            style={{ float: "right" }}
                                            href="javascript:;"
                                        >
                                            忘记密码
                                        </a>
                                    </FormItem>
                                    <FormItem>
                                        <Button
                                            className={styles.submit}
                                            type="primary"
                                            size="large"
                                            htmlType="submit"
                                        >
                                            登录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>
                        <div>
                            其他登录方式
                            <span className={styles.icon_qq} />
                            <span className={styles.icon_wechat} />
                        </div>
                    </div>
                </div>
                <div style={{ margin: "48px 0 24px" }}>
                    <Footer />
                </div>
            </div>
        );
    }
}

const Login = Form.create()(LoginPage);
export default Login;
