import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	StyleSheet,
	AppRegistry,
	Dimensions
} from 'react-native';

import * as firebase from 'firebase';

export default class LoginComponent extends Component {
	constructor (props) {
		super (props);

		this.state = {
			username: '',
			password: ''
		}

		var config = {
			apiKey: "AIzaSyAh4-pOSx-o4FZyMKDNkAVjdCXrVxYaMTg",
			authDomain: "mdpproject-7a456.firebaseapp.com",
			databaseURL: "https://mdpproject-7a456.firebaseio.com",
			storageBucket: "mdpproject-7a456.appspot.com",
			messagingSenderId: "851396932926"
		};
		firebase.initializeApp(config);
	}

	_loginPressed() {
		alert(this.state.username);
	}

	_registerPressed() {
		alert(this.state.username);
	}

	render () {
		return (
			<View>
				<View style={styles.container}>
					<TextInput style={styles.textInput} 
						onChangeText={(text) => this.setState({username: text})}
						value={this.state.username}
						placeholder="Username"
					/>
				</View>
				<View style={styles.container}>
					<TextInput style={styles.textInput} 
						onChangeText={(text) => this.setState({password: text})}
						value={this.state.password}
						placeholder="Password"
						secureTextEntry={true}
					/>
				</View>
				<View style={styles.container}>
					<TouchableHighlight
						style={[styles.button, styles.loginButton]}
						onPress={this._loginPressed.bind(this)}>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.container}>
					<TouchableHighlight
						style={styles.button}
						onPress={this._registerPressed.bind(this)}>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const screenWidth = Dimensions.get('window').width;
const padding = 16;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: padding
	},
	textInput: {
		width: screenWidth - 2 * padding
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		backgroundColor: "#aaaaaa"
	},
	loginButton: {
		backgroundColor: '#00aadd'
	},
	buttonText: {
		color: 'white'
	}
});

AppRegistry.registerComponent('LoginComponent', () => LoginComponent);