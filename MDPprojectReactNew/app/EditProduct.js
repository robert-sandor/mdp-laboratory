import React, {Component} from 'react';
import {View, Text, TouchableHighlight, TextInput, AsyncStorage,StyleSheet} from 'react-native';
// import GmailIntent from './GmailIntent';
import * as firebase from 'firebase';

export default class EditPotato extends Component {
    constructor(props) {
        super(props);
        this.state = {product: this.props.product,
            productRef: firebase.database().ref('/products/' + this.props.product.key)}
    }

    navFirst() {
        this.props.navigator.push({
            id: 'list'
        });
    }

     async removeProduct(){
        await this.state.productRef.remove();
        this.navFirst();
    }

    async updateProduct(){
        await this.state.productRef.update(this.state.product);
        this.navFirst();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TouchableHighlight onPress={this.navFirst.bind(this)}>
                    <Text>Go Back</Text>
                </TouchableHighlight>
                <Text>{this.state.product.name} - {this.state.product.price}</Text>
                <TextInput
                    placeholder='New Name'
                    onChangeText={(text) => {
                        this.state.product.name = text
                    }}/>
                <TextInput
                    placeholder='New Price'
                    onChangeText={(text) => {
                        this.state.product.price = text
                    }}/>
                <TouchableHighlight onPress={this.updateProduct.bind(this)}>
                    <Text>Update</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.removeProduct.bind(this)}>
                    <Text>Remove</Text>
                </TouchableHighlight>
               
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        width: 200,
        height: 200,
    },
});