
/**
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Contacts from './contacts';
import Thread from './thread';
import Button from '../components/button';

// TODO: Inspect scene to determine which screen to show
//       while staying at Home tab
export default class ContactsScene extends Component {
  static propTypes = {
    sceneProps: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    const { onNavigate, sceneProps } = this.props;
    const { scene, scenes } = sceneProps;
    console.log('[ContactsScene]', scene);

    switch (scene.route.key) {
    case 'Thread':
      return (
        <Thread sceneProps={sceneProps} navigate={onNavigate} />
      );
    case 'Contacts':
    default:
      return (
        <Contacts sceneProps={sceneProps} navigate={onNavigate} />
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // backgroundColor: '#fefefe'
  },
});
