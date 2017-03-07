import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, List} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

import style from './style.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if (this.props.home.list.length == 0) {
            this.handleLoad();
        } else {
            document.body.scrollTop = this.props.home.scroll_top;
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'home/fetch',
            data: {
                scroll_top: document.body.scrollTop
            }
        });
    }

    handleLoad() {
        http({
            url: '/product/list',
            data: {
                product_name: '',
                page_index: 1,
                page_size: 10
            },
            success: function (json) {
                for (let i = 0; i < json.data.length; i++) {
                    json.data[i].product_image = JSON.parse(json.data[i].product_image);
                }

                this.props.dispatch({
                    type: 'home/fetch',
                    data: {
                        list: json.data
                    }
                });
            }.bind(this),
            complete: function () {
                document.body.scrollTop = this.props.home.scroll_top;
            }.bind(this)
        }).post();
    }

    handleClick(product_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/product/detail/' + product_id,
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <NavBar className={style.header} mode="dark" iconName={false}>商品列表</NavBar>
                <div className={style.page}>
                    {
                        this.props.home.list.map(function (item) {
                            return (
                                <div className={style.productCard} key={item.product_id}
                                     onClick={this.handleClick.bind(this, item.product_id)}>
                                    <img className={style.productCardImage}
                                         src={constant.host + item.product_image[0]}/>
                                    <div className={style.productCardName}>{item.product_name}</div>
                                    <div className={style.productCardPrice}>¥{item.product_price}</div>
                                </div>
                            )
                        }.bind(this))
                    }
                    <div className={style.mainFooter}></div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {};

export default connect(({home}) => ({home}))(Home);
