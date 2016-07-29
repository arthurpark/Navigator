// export { default as Home } from './home';
// export { default as About } from './about';
// export { default as Modal } from './modal';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/button';

export const Home = (props) => (
  <View style={styles.scene}>
    <Button
      label="Open Modal"
      onPress={() => props.onNavigate({
        type: 'push',
        route: {
          key: 'Modal'
        }
      })}
    />
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
    paddingTop: 64,
    backgroundColor: '#fefefe'
  },
  text: {
    color: 'white'
  }
});
