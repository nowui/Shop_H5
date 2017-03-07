import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Toast, NavBar, List, Popup, Stepper} from 'antd-mobile';
import {Swipe, SwipeItem} from 'swipejs/react';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                product_image: [],
                product_stock: 0
            },
            number: 1
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
                json.data.product_image = JSON.parse(json.data.product_image);

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

    handleLeftClick() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleChange(number) {
        console.log(number);
        this.setState({
            number: number
        });
    }

    handleSubmit() {
        Popup.hide();

        this.props.dispatch(routerRedux.push({
            pathname: '/check',
            query: {}
        }));
    }

    handleCartClick() {
        this.handlePopup();
    }

    handleBuyClick() {
        this.handlePopup();
    }

    handlePopup() {
        Popup.show(<div>
            <div className={style.productPopupImage}><img className={style.productCardImage} src={constant.host + this.state.product.product_image[0]}/></div>
            <div className={style.productPopupPrice}>￥{this.state.product.product_price}</div>
            <div className={style.productPopupStock}>库存：{this.state.product.product_stock}</div>
            <List className={style.productPopupNumber}>
                <List.Item extra={
                    <Stepper
                        style={{width: '100%', minWidth: '2rem'}}
                        showNumber max={this.state.product.product_stock} min={1} defaultValue={this.state.number}
                        onChange={this.handleChange.bind(this)}
                    />}
                >
                    购买数量
                </List.Item>
            </List>
            <div className={style.productPopupSubmit} onClick={this.handleSubmit.bind(this)}>确定</div>
        </div>, {animationType: 'slide-up', maskClosable: true});
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleLeftClick.bind(this)}
                >商品明细</NavBar>
                <div className={style.page}>
                    {
                        this.state.product.product_image.length == 0 ?
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
                                    this.state.product.product_image.map(function (item, index) {
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
                            <span style={{color: 'red'}}>￥{this.state.product.product_price}</span>
                        </Item>
                    </List>
                </div>
                <div className={style.footer}>
                    <div className={style.productHome}>
                        <img className={style.productIcon} src={require('../assets/image/home.png')}/>
                        <div className={style.productFont}>首页</div>
                    </div>
                    <div className={style.productFavor}>
                        <img className={style.productIcon} src={require('../assets/image/favor.png')}/>
                        <div className={style.productFont}>收藏</div>
                    </div>
                    <div className={style.productAddCart} onClick={this.handleCartClick.bind(this)}>加入购物车</div>
                    <div className={style.productBuy} onClick={this.handleBuyClick.bind(this)}>立即购买</div>
                </div>
            </div>
        );
    }
}

ProductDetail.propTypes = {};

export default connect(({}) => ({}))(ProductDetail);
