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

export default class MainScreenComponent extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {name:'potato_1', price:100},
                {name:'potato_2', price:100},
                {name:'potato_3', price:100},
                {name:'potato_4', price:100},
                {name:'potato_5', price:100},
                {name:'potato_6', price:100},
                {name:'potato_7', price:100},
                {name:'potato_8', price:100},
                {name:'potato_9', price:100},
                {name:'potato_10', price:100}
            ])
        };
    }

    backClicked() {
        this.props.navigator.pop();
    }

    itemPressed() {
        this.props.navigator.pop();
    }

    render() {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === "android") {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableElement
                        onPress={this.backClicked}>
                        <View style={styles.buttonBlue}>
                            <Text style={styles.buttonText}>Menu</Text>
                        </View>
                    </TouchableElement>

                    <TouchableElement>
                        <View style={styles.buttonGray}>
                            <Text style={styles.buttonText}>Welcome, {this.props.username}!</Text>
                        </View>
                    </TouchableElement>

                    <TouchableElement
                        onPress={this.backClicked.bind(this)}>
                        <View style={styles.buttonRed}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </View>
                    </TouchableElement>
                </View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        return (
                            <TouchableElement
                            onPress={this.itemPressed.bind(this)}>
                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>{rowData.name}</Text>
                                    <Text style={styles.buttonText}>{rowData.price}</Text>
                                </View>
                            </TouchableElement>
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