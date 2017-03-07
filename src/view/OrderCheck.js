import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import database from '../util/database';
import style from './style.css';

class OrderCheck extends Component {
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
                        onLeftClick={this.handleLeftClick.bind(this)}>填写订单</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item arrow="horizontal">
                            收货地址
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item arrow="horizontal">
                            支付方式
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List renderHeader={() => '订单结算'}>
                        <Item extra="￥0.00">
                            商品金额
                        </Item>
                        <Item extra="￥0.00">
                            订单运费
                        </Item>
                    </List>
                </div>
                <div className={style.footer}>
                    <div className={style.checkTotal}><span className={style.checkTotalText}>实付总金额: ￥0.00</span></div>
                    <div className={style.checkSubmit}>提交订单</div>
                </div>
            </div>
        );
    }
}

OrderCheck.propTypes = {};

export default connect(({}) => ({}))(OrderCheck);
