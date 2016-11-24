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
    Platform,
    ListView
} from 'react-native';
import Product from "./product";
import RowComponent from "./row.component";

export default class MainScreenComponent extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                new Product(1, "product1", 799.99, "description"),
                new Product(2, "product2", 799.99, "description"),
                new Product(3, "product3", 799.99, "description"),
                new Product(4, "product4", 799.99, "description"),
                new Product(5, "product5", 799.99, "description"),
                new Product(6, "product6", 799.99, "description"),
                new Product(7, "product7", 799.99, "description"),
                new Product(8, "product8", 799.99, "description"),
                new Product(9, "product9", 799.99, "description")
            ])
        };
    }

    render() {
        let TouchableElement = TouchableHighlight;
        if (Platform.OS === "android") {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View style={styles.container}>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        return (
                            <RowComponent navigator={this.props.navigator} product={rowData} />
                        );
                    }}/>

            </View>
        );
    }
}

AppRegistry.registerComponent('ScreenComponent', () => MainScreenComponent);

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