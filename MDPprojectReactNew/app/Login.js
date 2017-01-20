import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TextInput, Alert} from 'react-native';
import * as firebase from 'firebase';
import FirebaseApp from "./FirebaseApp";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = ({email: '',
                        password: ''});
    }

    navFirst(){
        this.props.navigator.push({
            id: 'list'
        })
    }

    login() {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(auth => {
                this.navFirst();
            })
            .catch(err => {
                console.log(err);
                Alert.alert(
                    'Failed to Log in',
                    'Error Loggin in',
                    [
                        {text: 'OK', onPress: () => {}},
                    ]
                );
            });
    }

    onLogInPress() {
        if(this.state.email === '' || this.state.password === ''){
            Alert.alert(
                'Missing credentials',
                'The username or password fields are empty',
                [
                    {text: 'OK', onPress: () => {}},
                ]
            );
        }

        this.login();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.navFirst.bind(this)}>
                    <Text>Wilkomen!</Text>
                </TouchableHighlight>

                <TextInput
                    placeholder="Give email"
                    onChangeText={(text) => this.setState({email: text})}/>

                <TextInput
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder="Give password"/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onLogInPress.bind(this)}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableHighlight>
            </View>
        );
    }
};

//Styles
const styles = StyleSheet.create({
    container: {
        top: 10,
        padding: 5,
        flex: 1,
    },
    input: {
        margin: 1,
        padding: 5,
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 5
    },
    button: {
        alignSelf: 'stretch',
        top: 10,
        padding: 5,
        margin: 1,
        backgroundColor: '#48BBEC',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }
});