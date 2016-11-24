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

export default class RowComponent extends Component {
    constructor(props) {
        super(props);
    }

    itemPressed() {
        this.props.navigator.push({id: 'editScreen', product:this.props.product});
    }

    render() {
        let TouchableElement = TouchableHighlight;
        if (Platform.OS === "android") {
            TouchableElement = TouchableNativeFeedback;
        }
        return <TouchableElement
            onPress={this.itemPressed.bind(this)}>
            <View style={styles.row}>
                <Text style={styles.buttonText}>{this.props.product.name}</Text>
                <Text style={styles.buttonText}>{this.props.product.price}</Text>
            </View>
        </TouchableElement>;
    }
}

AppRegistry.registerComponent('RowComponent', () => RowComponent);

let inputWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#cccccc',
    },
    topBar: {
        flexDirection: 'row',
        width: inputWidth,
        backgroundColor: '#333333',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRed: {
        backgroundColor: '#cc3333',
        // width: inputWidth * .2,
        alignItems: 'center',
        borderRadius: 3,
        margin: 6
    },
    buttonBlue: {
        backgroundColor: '#3333cc',
        // width: inputWidth * .2,
        alignItems: 'center',
        borderRadius: 3,
        margin: 6
    },
    buttonGray: {
        backgroundColor: '#222222',
        // width: inputWidth * .2,
        alignItems: 'center',
        borderRadius: 3,
        margin: 6
    },
    buttonText: {
        color: '#eeeeee',
        margin: 10,
    },
    row: {
        backgroundColor: '#444444',
        margin: 6,
        width: inputWidth * .9,
        padding: 10,
    }
});