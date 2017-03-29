import React, {Component} from 'react';
import {List, Popup, Stepper, InputItem} from 'antd-mobile';

import constant from '../util/constant';
import style from './style.css';

class ProductPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleClose() {
    Popup.hide();
  }

  render() {
    return (
      <div className={style.productPopup}>
        <div className={style.productPopupHeader}>
          <div className={style.productPopupImage}>
            <img className={style.productCardImage} src={constant.host + this.props.product_image}/>
          </div>
          <div className={style.productPopupText}>
        <span
          className={style.productPopupRedText}>￥{this.props.product_price}</span>
          </div>
        </div>
        <List className={style.productPopupContent}>
          <List.Item extra={
            <Stepper
              style={{width: '100%', minWidth: '2rem'}}
              showNumber={false}
              max={this.props.product_stock}
              min={1}
              defaultValue={this.props.product_quantity}
              onChange={this.props.handleChange}
              useTouch={!window.isPC}
            />}
          >
            购买数量
          </List.Item>
        </List>
        <div className={style.productPopupSubmit} onClick={this.props.handleSubmit}>确定</div>
      </div>
    );
  }
}

ProductPopup.propTypes = {
  product_image: React.PropTypes.string.isRequired,
  product_price: React.PropTypes.number.isRequired,
  product_quantity: React.PropTypes.number.isRequired,
  product_stock: React.PropTypes.number.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

ProductPopup.defaultProps = {

};

export default ProductPopup;
