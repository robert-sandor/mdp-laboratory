import React, {Component} from 'react';
import Navigation from './app/Navigator';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';

export default class MDPprojectReactNew extends Component {
    render() {
        return (
            <Navigation/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('MDPprojectReactNew', () => MDPprojectReactNew);
