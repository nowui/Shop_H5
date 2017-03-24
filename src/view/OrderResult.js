import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, Result, Icon, Button} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';
import style from './style.css';

class OrderResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            is_pay: false,
            order: {}
        }
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http({
            url: '/order/confirm',
            data: {
                order_id: this.props.params.order_id
            },
            success: function (json) {
                if (json.data.order_is_pay) {
                    this.setState({
                        is_pay: true,
                        order: json.data
                    });
                } else {
                    if (this.state.count < 2) {
                        this.setState({
                            count: this.state.count + 1
                        });

                        setTimeout(function () {
                            this.handleLoad();
                        }.bind(this), 1500);
                    }
                }

            }.bind(this),
            complete: function () {

            }.bind(this)
        }).post();
    }

    handleSubmit() {
        this.props.dispatch(routerRedux.push({
            pathname: '/category',
            query: {}
        }));
    }

    render() {

        return (
            <div className="result">
                <NavBar className={style.header} mode="dark" iconName={false}>交易反馈</NavBar>
                <div className={style.page}>
                    {
                        this.state.is_pay ?
                            <Result
                                img={<Icon type="check-circle"
                                           style={{fill: '#1F90E6', width: '1.2rem', height: '1.2rem'}}/>}
                                title="订单支付成功"
                                message={<div>
                                    <div style={{
                                        fontSize: '0.73rem',
                                        color: '#000',
                                        lineHeight: 1
                                    }}>
                                        <span style={{fontSize: '0.64rem'}}>￥</span>{Number(this.state.order.order_receive_amount).toFixed(2)}
                                    </div>
                                </div>}
                            />
                            :
                            <Result
                                img={<Icon type={require('../assets/svg/waiting.svg')}
                                           style={{fill: '#1F90E6', width: '1.2rem', height: '1.2rem'}}/>}
                                title="等待确认"
                                message="已支付成功，等待平台确认"
                            />
                    }
                    <div style={{margin: '100px 10px 0px 10px'}}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>返回首页</Button>
                    </div>
                </div>
            </div>
        );
    }
}

OrderResult.propTypes = {};

export default connect(({}) => ({}))(OrderResult);
