import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import http from '../util/http';

import style from './style.css';

class OrderIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'order/fetch',
            data: {
                scroll_top: document.body.scrollTop
            }
        });
    }

    handleLoad() {
        http({
            url: '/order/list',
            data: {
                page_index: 1,
                page_size: 10
            },
            success: function (json) {
                this.setState({
                    list: json.data
                });
            }.bind(this),
            complete: function () {
                document.body.scrollTop = this.props.order.scroll_top;
            }.bind(this)
        }).post();
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleClick(order_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/order/detail/' + order_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleBack.bind(this)}>我的订单</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        {
                            this.state.list.map(function (item) {
                                return (
                                    <Item arrow="horizontal" key={item.order_id}
                                          onClick={this.handleClick.bind(this, item.order_id)}>
                                        {item.order_number}
                                    </Item>
                                )
                            }.bind(this))
                        }
                    </List>
                </div>
            </div>
        );
    }
}

OrderIndex.propTypes = {};

export default connect(({order}) => ({order}))(OrderIndex);
