import React, { Component } from 'react';
import { View, NavigationExperinemtal } from 'react-native';

const { StateUtils: NavigationStateUtils } = NavigationExperinemtal;

export default class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationState: {
        index: 0,
        routes: [{ key: 'home' }]
      }
    }
  }

  render() {
    return <View />;
  }

  onNavigationChange = (type) => {
    console.log(type);

    const { navigationState } = this.state;
    let newNavState;

    switch (type) {
    case 'push':
      const route = { key: 'Route-' + Date.now() };

      newNavState = NavigationStateUtils.push(navigationState, route);
      break;

    case 'pop':
      newNavState = NavigationStateUtils.pop(navigationState);
      break;

    default:
      newNavState = naviagationState;
      break;
    }

    if (this.state.navigationState !== newNavState) {
      this.setState({ navigationState: newNavState });
    }
  };
}
