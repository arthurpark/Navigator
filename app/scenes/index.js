/**
 * Scenes
 * @flow
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/button';
export { default as Home } from './home-scene';
export { default as Contacts } from './contacts-scene';
// export { default as Modal } from './modal';

export const Modal = (props) => (
  <View style={styles.scene}>
    <Text style={styles.text}>Modal</Text>
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 64,
    // backgroundColor: '#fefefe'
  },
  text: {
    color: 'white'
  }
});
