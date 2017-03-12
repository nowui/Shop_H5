import React, {PropTypes} from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';

import Main from './view/Main';
import Home from './view/Home';
import Category from './view/Category';
import Cart from './view/Cart';
import Mine from './view/Mine';
import Login from './view/Login';
import Register from './view/Register'
import ProductDetail from './view/ProductDetail';
import OrderIndex from './view/OrderIndex';
import OrderDetail from './view/OrderDetail';
import OrderCheck from './view/OrderCheck';
import OrderResult from './view/OrderResult';
import DeliveryIndex from './view/DeliveryIndex';
import DeliveryDetail from './view/DeliveryDetail';

import database from './util/database';

export default function ({history}) {

    const validate = function (next, replace, callback) {
        // if ((database.getToken() == '' || database.getToken() == null) && next.location.pathname != '/login' && next.location.pathname == '/mine') {
        //     replace('/login');
        // }

        // if (next.location.pathname == '/mine' || next.location.pathname == '/cart') {
        //     if ((database.getToken() == '' || database.getToken() == null)) {
        //             replace('/login');
        //         }
        // }

        callback();
    };

    return (
        <Router history={history}>
            <Route path="/" onEnter={validate}>
                <IndexRedirect to="home"/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <Route component={Main}>
                    <Route path="home" component={Home}/>
                    <Route path="category" component={Category}/>
                    <Route path="cart" component={Cart}/>
                    <Route path="mine" component={Mine}/>
                </Route>
                <Route path="product/detail/:product_id" component={ProductDetail}/>
                <Route path='order/index' component={OrderIndex}/>
                <Route path='order/detail/:order_id' component={OrderDetail}/>
                <Route path="order/check" component={OrderCheck}/>
                <Route path="order/result/:price" component={OrderResult}/>
                <Route path="delivery/index" component={DeliveryIndex}/>
                <Route path="delivery/add" component={DeliveryDetail}/>
                <Route path="delivery/edit/:delivery_id" component={DeliveryDetail}/>
            </Route>
        </Router>
    );
};
