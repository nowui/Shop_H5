import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {Toast, NavBar, WhiteSpace, List, Button, Popup} from 'antd-mobile';

import Login from './Login';

import constant from '../util/constant';
import database from '../util/database';
import style from './style.css';

class Mine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_login: database.getToken() != ''
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleOrder() {
        if (database.getToken() == '') {
            Popup.show(<Login type='PRODUCT' data={''} handleLoginSucess={this.handleLoginSucess.bind(this)}/>, {animationType: 'slide-up', maskClosable: false});
        } else {
            this.props.dispatch(routerRedux.push({
                pathname: '/order/index',
                query: {}
            }));
        }
    }

    handleDelivery() {
        if (database.getToken() == '') {
            Popup.show(<Login type='PRODUCT' data={''} handleLoginSucess={this.handleLoginSucess.bind(this)}/>, {animationType: 'slide-up', maskClosable: false});
        } else {
            this.props.dispatch(routerRedux.push({
                pathname: '/delivery/index',
                query: {}
            }));
        }
    }

    handleLogout() {
        database.removeToken();
        database.removeDelivery();

        this.setState({
            is_login: false
        });

        Toast.success('退出成功', constant.duration);
    }

    handleLoginSucess() {
        this.setState({
            is_login: true
        });
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
                            {
                                this.state.is_login ?
                                    <div className={style.name}>袁科</div>
                                    :
                                    ''
                            }
                            {
                                this.state.is_login ?
                                    <div className={style.clazz}>13560044643</div>
                                    :
                                    ''
                            }
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item thumb={require('../assets/image/form.png')} extra="查看全部订单" arrow="horizontal"
                              onClick={this.handleOrder.bind(this)}>
                            我的订单
                        </Item>
                        <Item>
                            <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>
                                <img src={require('../assets/image/pay.png')}/>
                                <div className={style.mineOrderItemText}>代付款</div>
                            </div>
                            <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>
                                <img src={require('../assets/image/send.png')}/>
                                <div className={style.mineOrderItemText}>代发货</div>
                            </div>
                            <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>
                                <img src={require('../assets/image/deliver.png')}/>
                                <div className={style.mineOrderItemText}>代收货</div>
                            </div>
                            <div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>
                                <img src={require('../assets/image/comment.png')}/>
                                <div className={style.mineOrderItemText}>已完成</div>
                            </div>
                        </Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item thumb={require('../assets/image/location.png')} arrow="horizontal"
                              onClick={this.handleDelivery.bind(this)}>
                            收货地址
                        </Item>
                    </List>
                    {
                        this.state.is_login ?
                            <div style={{margin: '50px 10px 0px 10px'}}>
                                <Button style={{backgroundColor: '#dd514c', color: '#ffffff'}}
                                        onClick={this.handleLogout.bind(this)}>退出系统</Button>
                            </div>
                            :
                            ''
                    }
                </div>
            </div>
        );
    }
}

Mine.propTypes = {};

export default connect(({}) => ({}))(Mine);
