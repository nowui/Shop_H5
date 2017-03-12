import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {NavBar, Result, Icon, Button} from 'antd-mobile';

import constant from '../util/constant';
import database from '../util/database';
import style from './style.css';

class OrderResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_login: database.getToken() != ''
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleSubmit() {
        this.props.dispatch(routerRedux.push({
            pathname: '/home',
            query: {}
        }));
    }

    render() {

        return (
            <div className="result">
                <NavBar className={style.header} mode="dark" iconName={false}>交易反馈</NavBar>
                <div className={style.page}>
                    <Result
                        img={<Icon type="check-circle" className="icon" style={{fill: '#1F90E6'}} />}
                        title="支付成功"
                        message={<div><div style={{ fontSize: '0.72rem', color: '#000', lineHeight: 1 }}>{Number(this.props.params.price).toFixed(2)}</div></div>}
                    />
                    <div style={{margin: '50px 10px 0px 10px'}}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>完成</Button>
                    </div>
                </div>
            </div>
        );
    }
}

OrderResult.propTypes = {};

export default connect(({}) => ({}))(OrderResult);
