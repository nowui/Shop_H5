import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, Result, Icon, Button} from 'antd-mobile';

import http from '../util/http';
import style from './style.css';

class OrderResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                this.setState({
                    order: json.data
                });
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
                                title="支付成功"
                                message={<div>
                                    <div style={{
                                        fontSize: '0.72rem',
                                        color: '#000',
                                        lineHeight: 1
                                    }}>{Number(this.props.params.price).toFixed(2)}</div>
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
                    {
                        this.state.is_pay ?
                            <div style={{margin: '50px 10px 0px 10px'}}>
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>返回首页</Button>
                            </div>
                            :
                            ''
                    }
                </div>
            </div>
        );
    }
}

OrderResult.propTypes = {};

export default connect(({}) => ({}))(OrderResult);
