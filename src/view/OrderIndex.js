import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import database from '../util/database';
import style from './style.css';

class OrderIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleLeftClick() {
        this.props.dispatch(routerRedux.goBack());
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleLeftClick.bind(this)}>我的订单</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item extra="￥100.00">
                            商品金额
                        </Item>
                        <Item extra="-￥1.00">
                            订单运费
                        </Item>
                    </List>
                </div>
            </div>
        );
    }
}

OrderIndex.propTypes = {};

export default connect(({order}) => ({order}))(OrderIndex);
