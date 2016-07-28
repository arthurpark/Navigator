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
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
  Header: NavigationHeader,
} = NavigationExperimental;


export default class Navigator extends Component {
  state: NavigationState;

  constructor(props) {
    super(props);

    this.state = reducer();
  }

  render() {
    return (
      <NavigationTransitioner
        style={styles.transitioner}
        navigationState={this.state}
        configureTransition={this._configureTransition}
        render={this._render}
        onTransitionStart={() => console.log('onTransitionStart', arguments)}
        onTransitionEnd={() => console.log('onTransitionEnd', arguments)}
      />
    );
  }

  _configureTransition = () : NavigationTransitionSpec => ({
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  });

  _render = (transitionProps) => {
    console.log('transitionProps', `[${transitionProps.scene.route.key}]`, transitionProps);
    Object.keys(transitionProps).map(key => {
      if (['layout', 'position'].indexOf(key) > -1) {
        console.info(key);
        console.table(transitionProps[key]);
      }
    })

    return transitionProps.scenes.map((scene) => {
      const sceneProps = {
        transitionProps,
        scene,
      };
      return this._renderScene(sceneProps);
    });
  };

  _renderScene = (sceneProps) => {
    // console.trace('_renderScene', sceneProps.scene.route.key);
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

    // return (
    //   <Scene
    //     {...sceneProps}
    //     key={sceneProps.scene.key}
    //     navigate={this._navigate}
    //   />
    // );
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
  transitioner: {

  },
});
