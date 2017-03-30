import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Stepper, Checkbox, Result} from 'antd-mobile';

import constant from '../util/constant';
import database from '../util/database';
import style from './style.css';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_all: false,
      is_select: false,
      cart_list: database.getCart()
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleEdit() {

  }

  handleChangeItem(product) {
    let isAll = true;
    let cartList = this.state.cart_list;

    for(let i = 0; i < cartList.length; i++) {
      if (cartList[i].product_id == product.product_id) {
        cartList[i].is_check = !cartList[i].is_check;

        if (!cartList[i].is_check) {
          isAll = false;
        }
      }
    }

    this.setState({
      is_all: isAll,
      cart_list: cartList
    });
  }

  handleChangeAll() {
    let isAll = !this.state.is_all;
    let cartList = this.state.cart_list;

    for(let i = 0; i < cartList.length; i++) {
      cartList[i].is_check = isAll;
    }

    this.setState({
      is_all: isAll,
      cart_list: cartList
    });
  }

  render() {
    const Item = List.Item;
    const CheckboxItem = Checkbox.CheckboxItem;

    return (
      <div>
        <NavBar className={style.header} mode="dark" iconName={false}
                rightContent={this.state.cart_list.length == 0 ? [] : [<div onClick={this.handleEdit.bind(this)} key='add'>编辑</div>]}>购物车</NavBar>
        <div className={style.page}>
          <WhiteSpace size="lg"/>
          <List>
            {
              this.state.cart_list.map(function (item, index) {
                return (
                  <Item key={item.product_id + index}
                        className={style.cartItem}>
                    <CheckboxItem checked={item.is_check} className={style.cartProductListCheckbox} activeStyle={{
                      backgroundColor: '#ffffff'
                    }} onChange={this.handleChangeItem.bind(this, item)}>
                    </CheckboxItem>
                    <img className={style.cartProductListImage}
                         src={constant.host + item.product_image}/>
                    <div className={style.cartProductListText}>
                      {item.product_name}

                      <div>× {item.product_quantity}</div>
                    </div>
                    <div className={style.cartProductListPrice}>{'￥' + (item.product_quantity * item.product_price[0].product_price).toFixed(2)}</div>
                  </Item>
                )
              }.bind(this))
            }
            {
              this.state.cart_list.length == 0 ?
                <Result
                  img={<img src={require('../assets/svg/empty.svg')} style={{width: '1.2rem', height: '1.2rem'}}/>}
                  message={constant.empty}
                />
                :
                ''
            }
          </List>
        </div>
        {
          this.state.cart_list.length == 0 ?
            ''
            :
            <div className={style.footer2}>
              <div className={style.checkTotal}>
                <CheckboxItem checked={this.state.is_all} activeStyle={{
                  backgroundColor: '#ffffff'
                }} className={style.CheckboxItem} onChange={this.handleChangeAll.bind(this)}>
                  全选
                </CheckboxItem>
              </div>
              <div className={style.productBuy}>提交订单</div>
            </div>
        }
      </div>
    );
  }
}

Cart.propTypes = {};

export default connect(({}) => ({}))(Cart);
