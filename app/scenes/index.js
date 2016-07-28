// export { default as Home } from './home';
// export { default as About } from './about';
// export { default as Modal } from './modal';
//
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Home = (props) => (
  <View style={styles.scene}>
    <Text style={styles.text}>Home</Text>
  </View>
);

export const About = (props) => (
  <View style={styles.scene}>
    <Text style={styles.text}>About</Text>
  </View>
);

export const Modal = (props) => (
  <View style={styles.scene}>
    <Text style={styles.text}>Modal</Text>
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
    backgroundColor: 'blue'
  },
  text: {
    color: 'white'
  }
});
