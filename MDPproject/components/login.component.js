/**
 * Created by sando on 11/9/2016.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    loginClicked() {
            let username = this.state.username;
            let password = this.state.password;

            if (username === 'user' && password === 'password') {
                this.props.navigator.push({id: 'mainScreen', username: username});
            } else {
                alert('Login failed! Invalid credentials!');
            }
    }

    render() {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === "android") {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View
                style={styles.container}>
                <Text style={styles.welcome}>Welcome !</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Username"}
                    onChangeText={(text) => this.setState({
                        username: text
                    })}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({
                        password: text
                    })}
                />
                <TouchableElement
                    style={styles.button}
                    onPress={this.loginClicked.bind(this)}>
                    <View refreshing="" style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableElement>
            </View>
        );
    }
}

AppRegistry.registerComponent("LoginComponent", () => LoginComponent);

let inputWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
    },
    welcome: {
        textAlign: 'center',
        color: "#333333",
        fontSize: 24,
        margin: 24,
    },
    input: {
        textAlign: 'center',
        color: '#333333',
        fontSize: 18,
        width: inputWidth * .8,
        margin: 10,
    },
    button: {
        backgroundColor: '#3333cc',
        width: inputWidth * .8,
        alignItems: 'center',
        borderRadius: 3,
    },
    buttonText: {
        color: '#eeeeee',
        margin: 10,
    },
});
