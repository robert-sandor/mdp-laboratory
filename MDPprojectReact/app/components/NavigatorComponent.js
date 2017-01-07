import React, { Component } from 'react';
import {
	AppRegistry,
	Navigator
} from 'react-native';

import LoginScreenComponent from './LoginScreenComponent';

export default class NavigatorComponent extends Component {
	render () {
		return (
			<Navigator 
				initialRoute={{index: 0, id: 'login'}}
				renderScene={this._navigatorRenderScene}
			/>
		);
	}

	_navigatorRenderScene(route, navigator) {
		switch (route.id) {
			case 'login': {
				return (<LoginScreenComponent navigator={navigator} />);
			}
		}
	} 
}

AppRegistry.registerComponent('NavigatorComponent', () => NavigatorComponent);