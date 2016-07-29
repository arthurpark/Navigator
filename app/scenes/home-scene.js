/**
 * HomeScene
 *   Show screens under Home tab
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Scene from '../components/scene';
import Conversations from './conversations';
import Thread from './thread';
import Button from '../components/button';

// TODO: Inspect scene to determine which screen to show
//       while staying at Home tab
export default class HomeScene extends Component {
  static propTypes = {
    sceneProps: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    const { onNavigate, sceneProps } = this.props;
    const { scene, scenes } = sceneProps;
    console.log('[HomeScene]', scene);

    switch (scene.route.key) {
    case 'Thread':
      return (
        <Thread sceneProps={sceneProps} navigate={onNavigate} />
      );

    case 'Home':
    default:
      return (
        <Conversations sceneProps={sceneProps} navigate={onNavigate} />
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
