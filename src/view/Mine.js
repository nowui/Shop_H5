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

  handleMine() {
    if (database.getToken() == '') {
      Popup.show(<Login type='PRODUCT' data={''} handleLoginSucess={this.handleLoginSucess.bind(this)}/>, {
        animationType: 'slide-up',
        maskClosable: false
      });
    } else {
      if (database.getMemberLevel().member_level_value == 1) {
        this.props.dispatch(routerRedux.push({
          pathname: '/qrcode',
          query: {}
        }));
      }
    }
  }

  handleOrder() {
    if (database.getToken() == '') {
      Popup.show(<Login type='PRODUCT' data={''} handleLoginSucess={this.handleLoginSucess.bind(this)}/>, {
        animationType: 'slide-up',
        maskClosable: false
      });
    } else {
      this.props.dispatch(routerRedux.push({
        pathname: '/order/index',
        query: {}
      }));
    }
  }

  handleDelivery() {
    if (database.getToken() == '') {
      Popup.show(<Login type='PRODUCT' data={''} handleLoginSucess={this.handleLoginSucess.bind(this)}/>, {
        animationType: 'slide-up',
        maskClosable: false
      });
    } else {
      this.props.dispatch(routerRedux.push({
        pathname: '/delivery/index/list',
        query: {}
      }));
    }
  }

  handleLogout() {
    database.removeWeChatOpenId();
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
            <Item onClick={this.handleMine.bind(this)} arrow={database.getMemberLevel().member_level_value == 1 ? 'horizontal' : ''}>
              {
                this.state.is_login ?
                  <div className={style.avatar}>
                    <img src={database.getUserAvatar()} style={{width: '100%', height: '100%'}}/>
                  </div>
                  :
                  '请登录平台'
              }
              {
                this.state.is_login ?
                  <div className={style.name}>{database.getUserName()}</div>
                  :
                  ''
              }
              {
                this.state.is_login ?
                  <div className={style.clazz}></div>
                  :
                  ''
              }
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          <List>
            <Item thumb={require('../assets/svg/form.svg')} arrow="horizontal"
                  onClick={this.handleOrder.bind(this)}>
              我的订单
            </Item>
            {/*<Item>*/}
            {/*<div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>*/}
            {/*<img src={require('../assets/svg/pay.svg')}/>*/}
            {/*<div className={style.mineOrderItemText}>已付款</div>*/}
            {/*</div>*/}
            {/*<div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>*/}
            {/*<img src={require('../assets/svg/send.svg')}/>*/}
            {/*<div className={style.mineOrderItemText}>已发货</div>*/}
            {/*</div>*/}
            {/*<div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>*/}
            {/*<img src={require('../assets/svg/deliver.svg')}/>*/}
            {/*<div className={style.mineOrderItemText}>已收货</div>*/}
            {/*</div>*/}
            {/*<div className={style.mineOrderItem} onClick={this.handleOrder.bind(this)}>*/}
            {/*<img src={require('../assets/svg/comment.svg')}/>*/}
            {/*<div className={style.mineOrderItemText}>已完成</div>*/}
            {/*</div>*/}
            {/*</Item>*/}
          </List>
          <WhiteSpace size="lg"/>
          <List>
            <Item thumb={require('../assets/svg/location.svg')} arrow="horizontal"
                  onClick={this.handleDelivery.bind(this)}>
              收货地址
            </Item>
          </List>
          {/*{*/}
          {/*this.state.is_login ?*/}
          {/*<div style={{margin: '100px 10px 0px 10px'}}>*/}
          {/*<Button style={{backgroundColor: '#dd514c', color: '#ffffff'}}*/}
          {/*onClick={this.handleLogout.bind(this)}>退出系统</Button>*/}
          {/*</div>*/}
          {/*:*/}
          {/*''*/}
          {/*}*/}
        </div>
      </div>
    );
  }
}

Mine.propTypes = {};

export default connect(({}) => ({}))(Mine);
