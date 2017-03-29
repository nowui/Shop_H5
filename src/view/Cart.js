import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Checkbox} from 'antd-mobile';

import database from '../util/database';
import style from './style.css';

class Cart extends Component {
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

  render() {
    const Item = List.Item;
    const CheckboxItem = Checkbox.CheckboxItem;

    return (
      <div>
        <NavBar className={style.header} mode="dark" iconName={false}>购物车</NavBar>
        <div className={style.page}>
          <WhiteSpace size="lg"/>
          <span className={style.checkboxItem}></span>

        </div>
        <div className={style.footer2}>
          <div className={style.checkTotal}>
            <div className={style.checkboxItem}>
              <CheckboxItem activeStyle={{
                backgroundColor: '#ffffff'
              }}>
                全选
              </CheckboxItem>
            </div>
          </div>
          <div className={style.productBuy}>提交订单</div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {};

export default connect(({}) => ({}))(Cart);
