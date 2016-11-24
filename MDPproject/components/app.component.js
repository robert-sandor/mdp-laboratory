import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Navigator,
    Text
} from 'react-native';
import LoginComponent from './login.component';
import MainScreenComponent from './mainscreen.component';
import EditScreenComponent from './edititem.component';

export default class MDPproject extends Component {
    render() {
        return (
            <Navigator initialRoute={{id: 'login'}} renderScene={MDPproject.renderScene}/>
        );
    }

    static renderScene(route, navigator) {
        let _navigator = navigator;
        switch (route.id) {
            case 'login':
                return (
                    <LoginComponent
                        navigator={_navigator}
                    />
                );
            case 'mainScreen':
                return (
                    <MainScreenComponent
                        navigator={_navigator}
                        username={route.username}
                    />
                );
            case 'editScreen':
                return (
                    <EditScreenComponent
                        navigator={_navigator}
                        product={route.product}
                    />
                );
        }
    }
}

AppRegistry.registerComponent('MDPproject', () => MDPproject);

