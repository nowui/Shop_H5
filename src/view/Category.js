import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar} from 'antd-mobile';

import constant from '../util/constant';
import wechat from '../util/wechat';
import http from '../util/http';

import style from './style.css';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        if (this.props.category.list.length == 0) {
            this.handleLoad();
        }

        wechat.auth();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http({
            url: '/product/all/list',
            data: {},
            success: function (json) {
                // for (let i = 0; i < json.data.length; i++) {
                //     json.data[i].product_image = JSON.parse(json.data[i].product_image);
                // }

                this.props.dispatch({
                    type: 'category/fetch',
                    data: {
                        list: json.data,
                        product: json.data[this.props.category.index].children
                    }
                });
            }.bind(this),
            complete: function () {

            }.bind(this)
        }).post();
    }

    handleCategory(index) {
        this.props.dispatch({
            type: 'category/fetch',
            data: {
                index: index,
                product: this.props.category.list[index].children
            }
        });
    }

    handleProduct(product_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/product/detail/' + product_id,
            query: {}
        }));
    }

    render() {
        return (
            <div>
                <NavBar className={style.header} mode="dark" iconName={false}>商品列表</NavBar>
                <div className={style.categoryPage}>
                    {
                        this.props.category.product.map(function (item) {
                            return (
                                <div className={style.productCard} key={item.product_id}
                                     onClick={this.handleProduct.bind(this, item.product_id)}>
                                    <img className={style.productCardImage}
                                         src={constant.host + JSON.parse(item.product_image)[0]}/>
                                    <div className={style.productCardName}>{item.product_name}</div>
                                    <div className={style.productCardPrice}>¥{item.product_price}</div>
                                </div>
                            )
                        }.bind(this))
                    }
                </div>
                <div className={style.categoryLeft}>
                    {
                        this.props.category.list.map(function (item, index) {
                            const itemStyle = index == this.props.category.index ? style.categoryLeftItem + ' ' + style.categoryLeftItemActive : style.categoryLeftItem;

                            return (
                                <div className={itemStyle} key={item.category_id} onClick={this.handleCategory.bind(this, index)}>{item.category_name}</div>
                            )
                        }.bind(this))
                    }
                </div>
            </div>
        );
    }
}

Category.propTypes = {};

export default connect(({category}) => ({category}))(Category);
