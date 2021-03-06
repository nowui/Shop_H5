import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

import constant from '../util/constant';
import database from '../util/database';
import http from '../util/http';

import style from './style.css';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        product: [],
        order_product_amount: 0,
        order_freight_amount: 0,
        order_amount: 0
      }
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
      success: function (data) {
        this.setState({
          order: data
        });
      }.bind(this),
      complete: function () {

      }.bind(this)
    }).post();
  }

  handleBack() {
    this.props.dispatch(routerRedux.push({
      pathname: '/order/index/',
      query: {}
    }));
  }

  handlePay() {
    http({
      url: '/order/pay',
      data: {
        order_id: this.props.params.order_id,
        open_id: database.getWeChatOpenId()
      },
      success: function (json) {
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data).bind(this), false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data).bind(this));
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data).bind(this));
          }
        } else {
          this.onBridgeReady(data).bind(this);
        }
      }.bind(this),
      complete: function () {

      }.bind(this)
    }).post();
  }

  onBridgeReady(data) {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": data.appId,
        "timeStamp": data.timeStamp,
        "nonceStr": data.nonceStr,
        "package": data.package,
        "signType": data.signType,
        "paySign": data.paySign
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          database.setProduct([]);

          this.props.dispatch(routerRedux.push({
            pathname: '/order/result/detail/' + data.orderId,
            query: {}
          }));
        } else {

        }
      }.bind(this)
    );
  }

  render() {
    const Item = List.Item;

    return (
      <div>
        <NavBar className={style.header} mode="light" leftContent="返回"
                onLeftClick={this.handleBack.bind(this)}>订单详情</NavBar>
        <div className={style.page}>
          <WhiteSpace size="lg"/>
          <List>
            <Item>
              <div>
                <div>{this.state.order.order_delivery_name} {this.state.order.order_delivery_phone}</div>
                <div className={style.deliveryAddress}>{this.state.order.order_delivery_address}</div>
              </div>
            </Item>
          </List>
          <WhiteSpace size="lg"/>
          <List>
            {
              this.state.order.product.map(function (item) {
                return (
                  <Item key={item.product_id} extra={'￥' + (item.product_quantity * item.product_price).toFixed(2)}>
                    <img className={style.productListImage}
                         src={constant.host + JSON.parse(item.product_image)[0]}/>
                    <div className={style.productListText}>
                      {item.product_name}
                      <div>× {item.product_quantity}</div>
                    </div>
                  </Item>
                )
              }.bind(this))
            }
          </List>
          <WhiteSpace size="lg"/>
          <List>
            <Item extra={'￥' + this.state.order.order_product_amount.toFixed(2)}>
              商品金额
            </Item>
            <Item extra={'￥' + this.state.order.order_freight_amount.toFixed(2)}>
              运费
            </Item>
          </List>

          <WhiteSpace size="lg"/>
          <List>
          </List>
        </div>
        {
          this.state.order.order_status == 'WAIT' ?
            <div className={style.footer}>
              <div className={style.checkTotal}><span
                className={style.checkTotalText}>实付总金额: ￥{this.state.order.order_amount.toFixed(2)}</span></div>
              <div className={style.checkSubmit} onClick={this.handlePay.bind(this)}>立刻支付</div>
            </div>
            :
            ''
        }
      </div>
    );
  }
}

OrderDetail.propTypes = {};

export default connect(({}) => ({}))(OrderDetail);
