import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import database from '../util/database';
import style from './style.css';

class Mine extends Component {
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

    handleOrder() {
        this.props.dispatch(routerRedux.push({
            pathname: '/order/index',
            query: {}
        }));
    }

    handleDelivery() {
        this.props.dispatch(routerRedux.push({
            pathname: '/delivery/index',
            query: {}
        }));
    }

    handleSubmit() {
        database.setToken('');

        this.props.dispatch({
            type: 'home/fetch',
            data: {
                list: []
            }
        });

        this.props.dispatch(routerRedux.push({
            pathname: '/login',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" iconName={false}>个人中心</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item>
                            <div className={style.avatar}></div>
                            <div className={style.name}>钟永强</div>
                            <div className={style.clazz}>15900672218</div>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item thumb={require('../assets/image/order.png')} arrow="horizontal"
                              onClick={this.handleOrder.bind(this)}>
                            我的订单
                        </Item>
                        <Item thumb={require('../assets/image/location.png')} arrow="horizontal"
                              onClick={this.handleDelivery.bind(this)}>
                            收货地址
                        </Item>
                    </List>
                    <div style={{margin: '50px 10px 0px 10px'}}>
                        <Button style={{backgroundColor: '#dd514c', color: '#ffffff'}}
                                onClick={this.handleSubmit.bind(this)}>退出系统</Button>
                    </div>
                </div>
            </div>
        );
    }
}

Mine.propTypes = {};

export default connect(({home}) => ({home}))(Mine);
