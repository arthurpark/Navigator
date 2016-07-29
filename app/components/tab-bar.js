/**
 * TabBar
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  NavigationExperimental
} from 'react-native';

class Tab extends Component {
  render() {
    const { route, style } = this.props;

    return (
      <TouchableHighlight onPress={this._handleTabPress} style={[styles.tab, style]}>
        <Text style={styles.tabText}>{route.key}</Text>
      </TouchableHighlight>
    );
  }

  _handleTabPress = (): void => {
    const { route, onNavigate } = this.props;
    onNavigate({ type: 'selectTab', tabKey: route.key });
  };
}

export default class TabBar extends Component {
  static propTypes = {
    navigationState: NavigationExperimental.PropTypes.navigationState.isRequired,
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    const { navigationState } = this.props;

    return (
      <View style={styles.tabs}>
        {navigationState.routes.map(this._renderTab)}
      </View>
    );
  }

  _renderTab = (route, index) => {
    const { navigationState, onNavigate } = this.props;

    return (
      <Tab key={route.key}
        route={route}
        onNavigate={onNavigate}
        style={navigationState.index === index ? styles.activeTab : undefined}
      />
    );
  };
}

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  tabText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
});
