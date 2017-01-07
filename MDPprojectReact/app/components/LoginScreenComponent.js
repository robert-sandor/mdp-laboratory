import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	AppRegistry,
	Dimensions
} from 'react-native';

import LoginComponent from './LoginComponent';

export default class LoginScreenComponent extends Component {
	render () {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Text style={{color: '#aaaaaa'}}>Placeholder Image</Text>					
				</View>
				<View style={styles.loginContainer}>
					<LoginComponent />
				</View>
			</View>
		);
	}
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: {
		width: screenWidth,
		flex: 1,
		backgroundColor: '#333333',
		alignItems: 'center',
		justifyContent: 'center'
	},
	loginContainer: {
		width: screenWidth,
		flex: 2,
		alignItems: 'center'
	}
});

AppRegistry.registerComponent('LoginScreenComponent', () => LoginScreenComponent);