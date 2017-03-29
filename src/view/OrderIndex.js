import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List} from 'antd-mobile';

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
    this.props.dispatch(routerRedux.push({
      pathname: '/mine',
      query: {}
    }));
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

                let order_status = '';
                if (item.order_status == 'WAIT') {
                  order_status = '待付款';
                } else if (item.order_status == 'EXPIRE') {
                  order_status = '超时未付款';
                } else if (item.order_status == 'CONFIRM') {
                  order_status = '已付款，待确认';
                } else if (item.order_status == 'PAYED') {
                  order_status = '已付款';
                } else if (item.order_status == 'SEND') {
                  order_status = '已发货';
                } else if (item.order_status == 'RECEIVED') {
                  order_status = '货已签收';
                } else if (item.order_status == 'FINISH') {
                  order_status = '订单完成';
                } else if (item.order_status == 'CANCEL') {
                  order_status = '订单取消';
                }

                return (
                  <Item wrap arrow="horizontal" key={item.order_id}
                        onClick={this.handleClick.bind(this, item.order_id)}>
                    <div>单号： {item.order_number}</div>
                    <div>姓名： {item.order_delivery_name}</div>
                    <div>地址： <span className={style.deliveryAddress}>{item.order_delivery_address}</span></div>
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
