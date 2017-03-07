import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {TabBar} from 'antd-mobile';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: this.props.routes[2].path
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handlePress(tab) {
        this.setState({
            selectedTab: tab
        });

        this.props.dispatch(routerRedux.push({
            pathname: '/' + tab,
            query: {}
        }));
    }

    render() {
        return (
            <div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="商品"
                        key="home"
                        icon={require('../assets/image/home.png')}
                        selectedIcon={require('../assets/image/home_active.png')}
                        selected={this.state.selectedTab === 'home'}
                        onPress={this.handlePress.bind(this, 'home')}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="分类"
                        key="category"
                        icon={require('../assets/image/category.png')}
                        selectedIcon={require('../assets/image/category_active.png')}
                        selected={this.state.selectedTab === 'category'}
                        onPress={this.handlePress.bind(this, 'category')}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="购物车"
                        key="cart"
                        icon={require('../assets/image/cart.png')}
                        selectedIcon={require('../assets/image/cart_active.png')}
                        selected={this.state.selectedTab === 'cart'}
                        onPress={this.handlePress.bind(this, 'cart')}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="个人"
                        key="mine"
                        icon={require('../assets/image/mine.png')}
                        selectedIcon={require('../assets/image/mine_active.png')}
                        selected={this.state.selectedTab === 'mine'}
                        onPress={this.handlePress.bind(this, 'mine')}
                    >
                    </TabBar.Item>
                </TabBar>
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {};

export default connect(({}) => ({}))(Main);
