import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, WhiteSpace, List, Button} from 'antd-mobile';

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

        return (
            <div>
                <NavBar className={style.header} mode="dark" iconName={false}>购物车</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>

                </div>
            </div>
        );
    }
}

Cart.propTypes = {};

export default connect(({}) => ({}))(Cart);
