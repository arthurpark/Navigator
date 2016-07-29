/**
 * Navigator
 * @flow
 */
import React, { Component } from 'react';
import {
  Easing,
  Text,
  View,
  NavigationExperimental,
  StyleSheet
} from 'react-native';
import reducer from './reducers/navigation';
import {
  Home,
  Contacts,
  Modal
} from './scenes';
import TabBar from './components/tab-bar';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
} = NavigationExperimental;


export default class Navigator extends Component {
  state: NavigationState;

  constructor(props) {
    super(props);

    this.state = reducer();
  }

  render() {
    const { tabs } = this.state;
    const tabKey = tabs.routes[tabs.index].key;
    const tabState = this.state[tabKey];

    return (
      <View style={styles.navigator}>
        <NavigationCardStack
          style={styles.stack}
          cardStyle={styles.card}
          navigationState={tabState}
          onNavigateBack={this._onNavigateBack}
          renderScene={this._renderScene}
          renderOverlay={this._renderOverlay}
        />
        <TabBar navigationState={tabs} onNavigate={this._navigate} />
      </View>
    );
  }

  // Render active tab's scene
  // TODO: without inspecting sceneProps.scene, render
  //       Scene based on selected tab, which then should
  //       render proper screen based on sceneProps.scene
  _renderScene = (sceneProps: Object): ReactElement => {
    // console.log('_renderScene', sceneProps.scene);
    const { tabs } = this.state;
    const tabKey = tabs.routes[tabs.index].key;
    const tabState = this.state[tabKey];

    switch (tabKey) {
    case 'home':
      return (
        <Home key={sceneProps.scene.key}
          sceneProps={sceneProps}
          onNavigate={this._navigate}
        />
      );
    case 'contacts':
      return (
        <Contacts key={sceneProps.scene.key}
          sceneProps={sceneProps}
          onNavigate={this._navigate}
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
    // console.log('_renderOverlay', sceneProps);
    return (
      <NavigationHeader
        {...sceneProps}
        renderTitleComponent={this._renderTitleComponent}
        onNavigateBack={this._handleNavigateBack}
        style={styles.header}
      />
    );
  };

  _renderTitleComponent = (sceneProps: NavigationSceneRendererProps): ReactElement => {
    const { tabs } = this.state;
    const tabKey = tabs.routes[tabs.index].key;

    return (
      <NavigationHeader.Title>
        {sceneProps.scene.route.key}
      </NavigationHeader.Title>
    );
  }

  // TODO: Dispatch Navigation Action
  // Reduce state based on action
  _navigate = (action: any) => {
    const nextState = reducer(this.state, action);

    if (nextState === this.state) {
      return false;
    }

    this.setState(nextState);
    return true;
  };

  _handleNavigateBack = (): void => {
    this._navigate({ type: 'pop' });
  };
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  stack: {
    flex: 1,
  },
  card: {
    flex: 1,
  }
});
