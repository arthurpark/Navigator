/**
 * App
 *   Bootstrap App
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connet } from 'react-redux';
import Navigator from './navigator';

export default class App extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}
