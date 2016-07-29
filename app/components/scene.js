/**
 * Scene
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import {
  Animated,
  ScrollView,
  View,
  Text,
  StyleSheet,
  NavigationExperimental,
} from 'react-native';
import Button from './button';

const { Card: NavigationCard } = NavigationExperimental;
const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator,
} = NavigationCard;

export default class Scene extends Component {
  props: NavigationSceneRendererProps & {
    navigate: Function,
    children: any,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    navigate: PropTypes.func.isRequired
  };

  render(): ReactElement<any> {
    const { children, scene } = this.props;

    const panHandlers = NavigationPagerPanResponder.forHorizontal({
      ...this.props,
      // onNavigateBack: () => navigate('back'),
      // onNavigateForward: () => navigate('forward'),
    });

    const style = [styles.scene, this._getAnimatedStyle()];
    // const style = [
    //   styles.scene,
    //   { backgroundColor: scene.route.color },
    //   NavigationPagerStyleInterpolator.forHorizontal(this.props)
    // ];

    console.log('color', scene, scene.route.color);

    return (
      <Animated.View
        {...panHandlers}
        style={style}
      >
        {this.props.children}
      </Animated.View>
    );
  }

  _getAnimatedStyle(): Object {
    const { layout, position, scene, } = this.props;
    console.log('_getAnimatedStyle', scene);
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
    flex: 1,
    flexDirection: 'column',
    paddingTop: 64,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
