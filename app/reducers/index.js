import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;


export default function reducer(state: ?NavigationState, action: any): NavigationState {
  if (!state) {
    return {
      index: 0,
      routes: [
        { key: 'home' }
      ],
    };
  }

  switch (action.type) {
    case 'push':
      const route = { key: action.key };
      return NavigationStateUtils.push(state, route);
    case 'pop':
      return NavigationStateUtils.pop(state);
  }
  return state;
}
