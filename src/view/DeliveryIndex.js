import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import database from '../util/database';
import http from '../util/http';
import style from './style.css';

class DeliveryIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http({
            url: '/delivery/list',
            data: {
                page_index: 1,
                page_size: 10
            },
            success: function (json) {
                this.props.dispatch({
                    type: 'delivery/fetch',
                    data: {
                        list: json.data
                    }
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        }).post();
    }

    handleLeftClick() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleAddClick() {
        this.props.dispatch(routerRedux.push({
            pathname: '/delivery/add',
            query: {}
        }));
    }

    handleEditClick(delivery_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/delivery/edit/' + delivery_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleLeftClick.bind(this)}
                        rightContent={[<div onClick={this.handleAddClick.bind(this)} key='add'>新增</div>]}>快递地址</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        {
                            this.props.delivery.list.map(function (item) {
                                return (
                                    <Item key={item.delivery_id}
                                          onClick={this.handleEditClick.bind(this, item.delivery_id)}>
                                        <div>{item.delivery_name} {item.delivery_phone}</div>
                                        <div>{item.delivery_address}</div>
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

DeliveryIndex.propTypes = {};

export default connect(({delivery}) => ({delivery}))(DeliveryIndex);
