/**
 * Navigator
 * @flow
 */
import React, { Component, PropTypes } from 'react';
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
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
  CardStack: NavigationCardStack,
} = NavigationExperimental;

const {
  CardStackStyleInterpolator: NavigationCardStackStyleInterpolator,
  CardStackPanResponder: NavigationCardStackPanResponder
} = NavigationCard;


export default class Navigator extends Component {
  static propTypes = {
    navigationState: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  render() {
    const { navigationState } = this.props;
    const { tabs } = navigationState;
    const tabKey = tabs.routes[tabs.index].key;
    const tabState = navigationState[tabKey];
    const route = tabState.routes[tabState.index];
    const hideTabBar = route.key === 'Modal';

    return (
      <View style={styles.container}>
        <NavigationTransitioner
          style={styles.container}
          navigationState={tabState}
          render={this._render}
          configureTransition={() => ({
            duration: 250,
            easing: Easing.inOut(Easing.ease)
          })}
        />

        {!hideTabBar && (
          <TabBar navigationState={tabs} onNavigate={this.props.navigate} />
        )}
      </View>
    );
  }

  _render = (transitionProps): ReactElement => {
    const { navigationState } = transitionProps;

    const route = navigationState.routes[navigationState.index];
    const activeScene = transitionProps.scenes.find(
      scene => !scene.isStale && scene.route === route ? scene : undefined
    );
    const sceneProps = { ...transitionProps, activeScene };

    const scenes = transitionProps.scenes.map(
      scene => this._renderTab({
        ...transitionProps,
        scene,
        direction: scene.route.direction
      })
    );

    const hideHeader = activeScene.route.key === 'Modal';

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {scenes}
        </View>

        {!hideHeader && this._renderHeader(sceneProps)}
      </View>
    )
  };

  _renderHeader = (sceneProps) => {
    return (
      <NavigationHeader
        {...sceneProps}
        renderTitleComponent={({ scene }) => (
          <NavigationHeader.Title>
            {scene.route.title}
          </NavigationHeader.Title>
        )}
        onNavigateBack={this._handleNavigateBack}
        style={styles.header}
      />
    );
  };

  // Render active tab's scene
  _renderScene = (sceneProps: Object): ReactElement => {
    const { scene, direction } = sceneProps;
    const isVertical = direction === 'vertical';

    const style = isVertical
                ? NavigationCardStackStyleInterpolator.forVertical(sceneProps)
                : NavigationCardStackStyleInterpolator.forHorizontal(sceneProps);

    const panHandlersProps = {
      ...sceneProps,
      onNavigateBack: this._handleNavigateBack,
    };
    const panHandlers = isVertical
                      ? NavigationCardStackPanResponder.forVertical(panHandlersProps)
                      : NavigationCardStackPanResponder.forHorizontal(panHandlersProps);

    return (
      <NavigationCard
        {...sceneProps}
        key={'card_' + scene.key}
        panHandlers={panHandlers}
        renderScene={this._renderTab}
        style={[style, styles.card]}
      />
    );
  };

  _renderTab = (sceneProps: Object): ReactElement => {
    const { navigationState } = this.props;
    const { tabs } = navigationState;
    const tabKey = tabs.routes[tabs.index].key;
    const tabState = navigationState[tabKey];

    switch (tabKey) {
    case 'home':
      return (
        <Home key={sceneProps.scene.key}
          sceneProps={sceneProps}
          onNavigate={this.props.navigate}
        />
      );
    case 'contacts':
      return (
        <Contacts key={sceneProps.scene.key}
          sceneProps={sceneProps}
          onNavigate={this.props.navigate}
        />
      );
    }
  };

  _handleNavigateBack = (): void => {
    this.props.navigate({ type: 'pop' });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
});
