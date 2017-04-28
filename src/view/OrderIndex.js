import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Result, Tabs} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class OrderIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_load: false,
      list: []
    }
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentWillUnmount() {

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
        this.setState({
          is_load: true
        });
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
    const TabPane = Tabs.TabPane;

    return (
      <div>
        <NavBar className={style.header} mode="light" leftContent="返回"
                onLeftClick={this.handleBack.bind(this)}>我的订单</NavBar>
        <div className={style.page}>
          <Tabs defaultActiveKey="0" animated={false}>
            <TabPane tab="全部订单" key="0">
            </TabPane>
            <TabPane tab="代付款" key="1">
            </TabPane>
            <TabPane tab="代发货" key="2">
            </TabPane>
            <TabPane tab="代收货" key="3">
            </TabPane>
            <TabPane tab="已完成" key="4">
            </TabPane>
          </Tabs>
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
            {
              this.state.is_load && this.state.list.length == 0 ?
                <Result
                  img={<img src={require('../assets/svg/empty.svg')} style={{width: '1.2rem', height: '1.2rem'}}/>}
                  message={constant.empty}
                />
                :
                ''
            }
          </List>
        </div>
      </div>
    );
  }
}

OrderIndex.propTypes = {};

export default connect(({order}) => ({order}))(OrderIndex);
