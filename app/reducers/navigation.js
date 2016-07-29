/**
 * Navigation Reducer
 * @flow
 */
import { NavigationExperimental } from 'react-native';
const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  tabs: {
    index: 0,
    routes: [
      {key: 'home'},
      {key: 'contacts'},
    ],
  },
  // Scenes for the `home` tab.
  home: {
    index: 0,
    routes: [{key: 'Conversations', color: '#ff0000'}],
  },
  // Scenes for the `contacts` tab.
  contacts: {
    index: 0,
    routes: [{key: 'Contacts', color: '#ff7f00'}],
  },
  // Scenes for the `modal` tab.
  modal: {
    index: 0,
    routes: [{ key: 'Modal', color: '#ffff00', direction: 'vertical' }],
  },
};

// Hash table of reducer functions,
// where key === action.type
const reducers = {
  push(state: Object, action: any): Object {
    const route: Object = action.route;
    const { tabs } = state;
    const tabKey = tabs.routes[tabs.index].key;
    const tabState = state[tabKey];
    const nextTabState = NavigationStateUtils.push(tabState, route);
    if (nextTabState !== tabState) {
      return {
        ...state,
        [tabKey]: nextTabState,
      }
    }

    return state;
  },

  pop(state: Object, action: any): Object {
    const { tabs } = state;
    const tabKey = tabs.routes[tabs.index].key;
    const tabState = state[tabKey];
    const nextTabState = NavigationStateUtils.pop(tabState);
    if (nextTabState !== tabState) {
      return {
        ...state,
        [tabKey]: nextTabState,
      }
    }

    return state;
  },

  selectTab(state: Object, action: any): Object {
    const { tabKey } = action;
    const tabs = NavigationStateUtils.jumpTo(state.tabs, tabKey);

    console.log('selectTab', tabKey, tabs === state.tabs, tabs)
    if (tabs !== state.tabs) {
      return {
        ...state,
        tabs,
      };
    }

    return state;
  }
};

export default function navigationReducer(
  state: ?NavigationState,
  action: any
): ?NavigationState {
  if (!state) {
    return initialState;
  }
  const reducer = reducers[action.type];
  const nextState = reducer(state, action);

  if (nextState !== state) {
    return nextState;
  }

  return state;
}
