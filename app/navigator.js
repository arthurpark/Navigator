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
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
} = NavigationExperimental;

const {
  CardStackStyleInterpolator: NavigationCardStackStyleInterpolator,
  CardStackPanResponder: NavigationCardStackPanResponder
} = NavigationCard;


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
    const route = tabState.routes[tabState.index];
    const hideTabBar = route.key === 'Modal';

    return (
      <View style={styles.navigator}>
        <NavigationTransitioner
          style={styles.stack}
          navigationState={tabState}
          render={this._render}
        />

        {!hideTabBar && (
          <TabBar navigationState={tabs} onNavigate={this._navigate} />
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
      scene => this._renderScene({
        ...transitionProps,
        scene,
        direction: scene.route.direction
      })
    );

    const hideHeader = activeScene.route.key === 'Modal';

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          {scenes}
        </View>

        {!hideHeader && (
          <NavigationHeader
            {...sceneProps}
            renderTitleComponent={({ scene }) => (
              <NavigationHeader.Title>
                {scene.route.key}
              </NavigationHeader.Title>
            )}
            onNavigateBack={this._handleNavigateBack}
            style={styles.header}
          />
        )}
      </View>
    )
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
    }
  };

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
  },
  cardContainer: {
    flex: 1,
  },
});
