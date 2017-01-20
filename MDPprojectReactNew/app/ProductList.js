import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    ListView,
    TextInput,
    Image,
    ScrollView,
    AppRegistry,
    NetInfo,
    Alert,
    AppState
} from 'react-native';
import * as firebase from 'firebase';
import PushNotification from 'react-native-push-notification';
import PushNotificationController from './PushNotificationController';

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{}]),
            productPrice: '',
            productName: '',
            productDatabase: firebase.database().ref('/products'),
            arrayProducts: [],
            currentAppState: AppState.currentState
        };

        this._handleAppStateChange = this._handleAppStateChange.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        this.state.productDatabase.on('child_added', snapshot => {
            this.addProductSnapshot(snapshot);
            this.updateListViewDataSource(this.state.arrayProducts);

            if (this.state.currentAppState === 'background') {
                PushNotification.localNotificationSchedule({
                    message: "A product has been added",
                    date: new Date(Date.now())
                });
            }
        });
        this.state.productDatabase.on('child_changed', snapshot => {
            this.updateProductSnapshot(snapshot);
            this.updateListViewDataSource(this.state.arrayProducts);

            if (this.state.currentAppState === 'background') {
                PushNotification.localNotificationSchedule({
                    message: "A product has been changed",
                    date: new Date(Date.now())
                });
            }
        });
        this.state.productDatabase.on('child_removed', snapshot => {
            this.removeProductSnapshot(snapshot);
            this.updateListViewDataSource(this.state.arrayProducts);
            if (this.state.currentAppState === 'background') {
                PushNotification.localNotificationSchedule({
                    message: "A product has been removed",
                    date: new Date(Date.now())
                });
            }
        });
        this.state.productDatabase.on('child_moved', snapshot => {
        });
    }

    updateListViewDataSource(data) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(data)
        });
    }

    addProductSnapshot(snapshot) {
        let product = snapshot.val();
        product.keyString = snapshot.key;
        this.state.arrayProducts.push(product);
    }

    removeProductSnapshot(snapshot) {
        this.state.arrayProducts = this.state.arrayProducts.filter(product => product.keyString !== snapshot.key);
    }

    updateProductSnapshot(snapshot) {
        for (let i = 0; i < this.state.arrayProducts.length; i++) {
            if (this.state.arrayProducts[i].keyString === snapshot.key) {
                this.state.arrayProducts[i] = snapshot.val();
            }
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    _handleAppStateChange(currentAppState) {
        this.setState({currentAppState: currentAppState});
    }

    addProduct() {
        if (this.state.productName === '' || this.state.productPrice === '') return;

        let newPostRef = this.state.productDatabase.push();
        newPostRef.set({name: this.state.productName, price: this.state.productPrice});

        this.state.productName = '';
        this.state.productPrice = '';
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='New Product Name'
                    value={this.state.productName}
                    onChangeText={(text) => {
                        this.setState({productName: text})
                    }}/>
                <TextInput
                    placeholder='New Product Price'
                    value={this.state.productPrice}
                    onChangeText={(text) => {
                        this.setState({productPrice: text})
                    }}/>
                <TouchableHighlight onPress={this.addProduct.bind(this)}>
                    <Text>Add Product</Text>
                </TouchableHighlight>
                <PushNotificationController />
                <ScrollView>
                    <ListView dataSource={this.state.dataSource}
                              renderRow={(data) => <Row navigator={this.props.navigator}  {...data} />}/>
                </ScrollView>
            </View>
        );
    }
}

export class Row extends Component {
    constructor(props) {
        super(props);
    }

    navEdit() {
        this.props.navigator.push({
            id: 'edit',
            product: {name: this.props.name, price: this.props.price, key: this.props.keyString}
        })
    }


    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableHighlight onPress={this.navEdit.bind(this)}>
                    <Text>{this.props.name} - {this.props.price}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

//Styles
const styles = StyleSheet.create({
    container: {
        top: 10,
        padding: 5
    }
});

AppRegistry.registerComponent("ProductList", () => ProductList);