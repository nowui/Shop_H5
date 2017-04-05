import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';

import Auth from './view/Auth';
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
import Qrcode from './view/Qrcode';

import database from './util/database';

export default function ({history}) {

  const handleEnter = function (next, replace, callback) {
    // database.setBackUrl(next.location.pathname);

    callback();
  };

  const handleChange = function (next, replace, callback) {
    // database.setBackUrl(next.location.pathname);

    callback();
  };

  return (
    <Router history={history}>
      <Route path="/" onEnter={handleEnter} onChange={handleChange}>
        <IndexRedirect to="category"/>
        <Route path="auth/:wechat_open_id" component={Auth}/>
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
        <Route path="order/check/:type" component={OrderCheck}/>
        <Route path="order/result/:type/:order_id" component={OrderResult}/>
        <Route path="delivery/index/:type" component={DeliveryIndex}/>
        <Route path="delivery/add/:type" component={DeliveryDetail}/>
        <Route path="delivery/edit/:type/:delivery_id" component={DeliveryDetail}/>
        <Route path="qrcode" component={Qrcode}/>
      </Route>
    </Router>
  );
};
