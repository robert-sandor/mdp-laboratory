/**
 * Created by sando on 11/10/2016.
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
    Platform,
    ListView
} from 'react-native';
import Product from "./product";

export default class EditScreenComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.product.name,
            price: '' + this.props.product.price,
            description: this.props.product.description
        };
    }

    saveClicked() {
        this.props.navigator.pop();
    }

    cancelClicked() {
        this.props.navigator.pop();
    }

    render() {
        let TouchableElement = TouchableHighlight;
        if (Platform.OS === "android") {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({
                        name: text
                    })}
                />
                <TextInput
                    style={styles.input}
                    value={'' + this.state.price}
                    onChangeText={(text) => this.setState({
                        price: text
                    })}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.description}
                    onChangeText={(text) => this.setState({
                        description: text
                    })}
                />
                <TouchableElement
                    style={styles.button}
                    onPress={this.saveClicked.bind(this)}>
                    <View refreshing="" style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableElement>
                <TouchableElement
                    style={styles.button}
                    onPress={this.cancelClicked.bind(this)}>
                    <View refreshing="" style={styles.button}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </View>
                </TouchableElement>
            </View>
        );
    }
}

AppRegistry.registerComponent('EditScreenComponent', () => EditScreenComponent);

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
        marginBottom: 6,
    },
    buttonText: {
        color: '#eeeeee',
        margin: 10,
    },
});

