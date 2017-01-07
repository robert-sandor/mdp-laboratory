import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import NavigatorComponent from './app/components/NavigatorComponent';

export default class MDPprojectReact extends Component {
  render() {
    return (
        <NavigatorComponent />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('MDPprojectReact', () => MDPprojectReact);
