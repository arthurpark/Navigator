/**
 * Tabs
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
    const { tab, style } = this.props;

    return (
      <TouchableHighlight onPress={this._handleTabPress} style={[styles.tab, style]}>
        <Text style={styles.tabText}>{tab.key}</Text>
      </TouchableHighlight>
    );
  }

  _handleTabPress = (): void => {
    const { tab, onNavigate } = this.props;
    onNavigate({ type: 'selectTab', tabKey: tab.key });
  };
}

export default class Tabs extends Component {
  static propTypes = {
    tabs: NavigationExperimental.PropTypes.navigationState.isRequired,
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    const { tabs } = this.props;

    return (
      <View style={styles.tabs}>
        {tabs.routes.map(this._renderTab)}
      </View>
    );
  }

  _renderTab = (tab, index) => {
    const { tabs, onNavigate } = this.props;

    return (
      <Tab key={tab.key}
        tab={tab}
        onNavigate={onNavigate}
        style={tabs.index === index ? styles.activeTab : undefined}
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
