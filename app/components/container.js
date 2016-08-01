/**
 * Container
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contaienr: {
    flex: 1,
  }
});
