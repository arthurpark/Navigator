import React, { Component } from 'react';
import {
  Easing,
  Text,
  View,
  NavigationExperimental,
  StyleSheet
} from 'react-native';
import reducer from './reducers';
import {
  Home,
  About,
  Modal
} from './scenes';
import Scene from './components/scene';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental;


export default class Navigator extends Component {
  state: NavigationState;

  constructor(props) {
    super(props);

    this.state = reducer().navigation;
  }

  render() {
    return (
      <NavigationCardStack
        style={styles.stack}
        cardStyle={styles.card}
        navigationState={this.state}
        onNavigateBack={this._onNavigateBack}
        renderScene={this._renderScene}
        renderOverlay={this._renderOverlay}
      />
    );
  }

  _renderScene = (sceneProps: Object): ReactElement => {
    console.trace('_renderScene', sceneProps.scene.route.key);
    switch (sceneProps.scene.route.key) {
      case 'home':
        return (
          <Home
            {...sceneProps}
            key={sceneProps.scene.key}
            navigate={this._navigate}
          />
        );
      case 'about':
        return (
          <About
            {...sceneProps}
            key={sceneProps.scene.key}
            navigate={this._navigate}
          />
        );
      case 'modal':
        return (
          <Modal
            {...sceneProps}
            key={sceneProps.scene.key}
            navigate={this._navigate}
          />
        );
    }
  };

  _renderOverlay = (sceneProps: NavigationSceneRendererProps): ReactElement<any> => {
    console.log('_renderOverlay', sceneProps);
    return (
      <NavigationHeader
        {...sceneProps}
      />
    );
  };

  // TODO: Dispatch Navigation Action
  // Reduce state based on action
  _navigate = (action: any) => {
    if (action.type === 'exit') {
      return false;
    }

    const nextState = reducer(this.state, action);

    if (nextState === this.state) {
      return false;
    }

    this.setState(nextState);
    return true;
  };
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
  card: {
    flex: 1,
  }
});
