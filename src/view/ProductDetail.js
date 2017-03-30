import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {NavBar, List, Popup, Icon} from 'antd-mobile';
import {Swipe, SwipeItem} from 'swipejs/react';

import constant from '../util/constant';
import database from '../util/database';
import http from '../util/http';

import ProductPopup from './ProductPopup';

import style from './style.css';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_cart: true,
      product_quantity: 1,
      product: {
        product_image: [],
        product_image_list: [],
        product_price: [],
        product_stock: 0
      }
    }
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentWillUnmount() {
    this.refs.swipe.instance.stop();
  }

  handleLoad() {
    http({
      url: '/product/find',
      data: {
        product_id: this.props.params.product_id
      },
      success: function (json) {
        json.data.product_image_list = JSON.parse(json.data.product_image_list);
        json.data.product_image = JSON.parse(json.data.product_image);
        json.data.product_price = JSON.parse(json.data.sku_list[0].product_price);
        json.data.product_stock = json.data.sku_list[0].product_stock;
        json.data.sku_id = json.data.sku_list[0].sku_id;

        this.setState({
          product: json.data
        });
      }.bind(this),
      complete: function () {
        // this.refs.swipe.instance.setup({
        //     continuous: true
        // });
      }.bind(this)
    }).post();
  }

  handleBack() {
    this.props.dispatch(routerRedux.push({
      pathname: '/category',
      query: {}
    }));
  }

  handleSubmit() {
    if (this.state.is_cart) {
      database.setCart({
        product_id: this.state.product.product_id,
        product_name: this.state.product.product_name,
        product_image: this.state.product.product_image[0],
        product_price: this.state.product.product_price,
        product_quantity: this.state.product_quantity,
        product_stock: this.state.product.product_stock,
        sku_id: this.state.product.sku_id
      });
    } else {
      database.setProduct([{
        product_id: this.state.product.product_id,
        product_name: this.state.product.product_name,
        product_image: this.state.product.product_image[0],
        product_price: this.state.product.product_price,
        product_quantity: this.state.product_quantity,
        sku_id: this.state.product.sku_id
      }]);

      setTimeout(function () {
        this.props.dispatch(routerRedux.push({
          pathname: '/order/check/product_' + this.props.params.product_id,
          query: {}
        }));
      }.bind(this), 500);
    }
  }

  handleGo() {
    this.props.dispatch(routerRedux.push({
      pathname: '/cart',
      query: {}
    }));
  }

  handleCart() {
    this.setState({
      is_cart: true
    });

    this.handlePopup();
  }

  handleHome() {
    this.props.dispatch(routerRedux.push({
      pathname: '/category',
      query: {}
    }));
  }

  handleBuy() {
    this.setState({
      is_cart: false
    });

    this.handlePopup();
  }

  handleChange(product_quantity) {
    this.setState({
      product_quantity: product_quantity
    });
  }

  handlePopup() {
    Popup.show(<ProductPopup
      product_image={this.state.product.product_image[0]}
      product_price={this.state.product.product_price[this.state.product.product_price.length - 1].product_price}
      product_quantity={this.state.product_quantity}
      product_stock={this.state.product.product_stock}
      handleChange={this.handleChange.bind(this)}
      handleSubmit={this.handleSubmit.bind(this)}/>, {animationType: 'slide-up', maskClosable: true});
  }

  render() {
    const Item = List.Item;

    return (
      <div>
        <NavBar className={style.header} mode="dark" leftContent="返回"
                onLeftClick={this.handleBack.bind(this)}
                rightContent={[<img key={1} className={style.cartIcon} src={require('../assets/svg/cart_white.svg')} onClick={this.handleGo.bind(this)}/>]}
        >商品详情</NavBar>
        <div className={style.page}>
          {
            this.state.product.product_image_list.length == 0 ?
              ''
              :
              <Swipe className=''
                     ref='swipe'
                     startSlide={0}
                     speed={300}
                     auto={3000}
                     draggable={true}
                     continuous={true}
                     autoRestart={true}
                     disableScroll={false}
                     stopPropagation={false}>
                {
                  this.state.product.product_image_list.map(function (item, index) {
                    return (
                      <SwipeItem className={style.productImage} key={index}>
                        <img className={style.productCardImage}
                             src={constant.host + item}/>
                      </SwipeItem>
                    )
                  }.bind(this))
                }
              </Swipe>
          }

          <List>
            <Item>
              {this.state.product.product_name}
              <br/>
              {
                this.state.product.product_price.length > 0 ?
                  <span
                    className={style.productPopupRedText}>￥{this.state.product.product_price[0].product_price}</span>
                  :
                  ''
              }
            </Item>
          </List>

          <div dangerouslySetInnerHTML={{__html: this.state.product.product_content}}></div>
        </div>
        <div className={style.footer}>
          <div className={style.productHome} onClick={this.handleHome.bind(this)}>
            <img className={style.productIcon} src={require('../assets/svg/home.svg')}/>
            <div className={style.productFont}>首页</div>
          </div>
          <div className={style.productFavor}>
            <img className={style.productIcon} src={require('../assets/svg/favor.svg')}/>
            <div className={style.productFont}>收藏</div>
          </div>
          <div className={style.productAddCart} onClick={this.handleCart.bind(this)}>加入购物车</div>
          <div className={style.productBuy} onClick={this.handleBuy.bind(this)}>立即购买</div>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {};

export default connect(({}) => ({}))(ProductDetail);
