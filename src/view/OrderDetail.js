import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import http from '../util/http';

import style from './style.css';

class OrderDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            url: '/order/find',
            data: {
                order_id: this.props.params.order_id
            },
            success: function (json) {
                this.setState({
                    order: json.order
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        }).post();
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleBack.bind(this)}>我的订单</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>

                </div>
            </div>
        );
    }
}

OrderDetail.propTypes = {};

export default connect(({}) => ({}))(OrderDetail);
