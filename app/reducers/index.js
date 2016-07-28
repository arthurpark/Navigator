import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [
    { key: 'home' }
  ],
};

const navigationReducers = {
  push(state, action: any) {
    const route = { key: action.key };
    return NavigationStateUtils.push(state, route);
  },

  pop(state, action: any) {
    return NavigationStateUtils.pop(state);
  }
};

const navigation = (state: ?NavigationState, action: any): ?NavigationState => {
  if (!state) {
    return initialState;
  }

  const reducer = navigationReducers[action.type];
  if (reducer) {
    return reducer(state, action);
  }

  return state;
}

export default function reducer(
  state: ?NavigationState = {}, action: any
): Object {
  return {
    navigation: navigation(state.navigation, action)
  };
}
