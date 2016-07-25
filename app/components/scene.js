/**
 * Scene
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { Animated, ScrollView, View, Text, StyleSheet } from 'react-native';
import Button from './button';

export default class Scene extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };

  render(): ReactElement<any> {
    const { children } = this.props;

    return (
      <Animated.View
        style={[styles.scene, this._getAnimatedStyle()]}
      >
        {this.props.children}
      </Animated.View>
    );
  }

  _getAnimatedStyle(): Object {
    const { layout, position, scene, } = this.props;
    const { index, } = scene;

    const inputRange = [index - 1, index, index + 1];
    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange,
      outputRange: ([width, 0, -10]: Array<number>),
    });

    return {
      transform: [
        { translateX },
      ],
    };
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#E9E9EF',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
