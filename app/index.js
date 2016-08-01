/**
 * App
 *   Bootstrap App
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connet } from 'react-redux';
import Navigator from './navigator';
import reducer from './reducers';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = reducer();
  }

  render() {
    return (
      <Navigator
        navigationState={this.state.navigation}
        navigate={this._navigate}
      />
    );
  }

  // TODO: Dispatch Navigation Action
  //       Reduce state based on action
  _navigate = (action: any) => {
    const nextState = reducer(this.state, action);

    if (nextState === this.state) {
      return false;
    }

    this.setState(nextState);
    return true;
  };
}
