import React, {Component} from 'react';
import {Navigator} from 'react-native'
import ProductList from './ProductList';
import Login from './Login'
import EditProduct from './EditProduct';
export default class Navigation extends Component{
    render() {
        return (
            <Navigator
                initialRoute={{id: 'login'}}
                renderScene={this.navigatorRenderScene} />
                );
    }

    navigatorRenderScene(route, navigator) {
        let _navigator = navigator;
        switch (route.id) {
            case 'list':
                return (<ProductList navigator={_navigator} title="ProductList"/>);
            case 'login':
                return (<Login navigator={_navigator} title="Login" />);
            case 'edit' :
                return (<EditProduct navigator={_navigator} product={route.product} title="EditProduct"/>)
        }
    }
}