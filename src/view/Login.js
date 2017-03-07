import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';
import {Toast, NavBar, List, InputItem, Button} from 'antd-mobile';

import constant from '../util/constant';
import database from '../util/database';
import http from '../util/http';
import style from './style.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                http({
                    url: '/member/login',
                    data: values,
                    success: function (json) {
                        Toast.success('登录成功');

                        database.setToken(json.data.token);
                        database.setName(json.data.student_name);
                        database.setClazz(json.data.clazz_name);

                        setTimeout(function () {
                            this.props.dispatch(routerRedux.push({
                                pathname: '/home',
                                query: {}
                            }));
                        }.bind(this), constant.timeout * 300);
                    }.bind(this),
                    complete: function () {

                    }.bind(this)
                }).post();
            }
        });
    }

    handleRegister() {
        this.props.dispatch(routerRedux.push({
            pathname: '/register',
            query: {}
        }));
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
                <NavBar className={style.header} mode="dark" iconName={false}>用户登录</NavBar>
                <div className={style.page}>
                    <form style={{margin: '50px 10px 0px 10px'}}>
                        <List>
                            <InputItem
                                {...getFieldProps('user_phone', {
                                    rules: [{
                                        required: true,
                                        message: '请输入帐号'
                                    }],
                                    initialValue: '13560044643'
                                })}
                                error={!!getFieldError('user_phone')}
                                clear
                                placeholder="请输入帐号"
                            >帐号</InputItem>
                            <InputItem
                                {...getFieldProps('user_password', {
                                    rules: [{
                                        required: true,
                                        message: '请输入密码'
                                    }],
                                    initialValue: '123456'
                                })}
                                error={!!getFieldError('user_password')}
                                clear
                                placeholder="请输入密码"
                                type="password"
                            >密码</InputItem>
                        </List>
                    </form>
                    <div style={{margin: '50px 10px 0px 10px'}}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                    </div>
                    {/*<div style={{margin: '20px 10px 0px 10px'}}>*/}
                        {/*<div style={{textAlign: 'right'}} onClick={this.handleRegister.bind(this)}>免费注册</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

Login.propTypes = {};

Login = createForm()(Login);

export default connect(({}) => ({}))(Login);
