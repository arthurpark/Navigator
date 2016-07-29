/**
 * Root Reducer
 * @flow
 */
import navigation from './navigation';

export default function reducer(
  state: ?NavigationState = {},
  action: any
): Object {
  const nextState = {
    navigation: navigation(state.navigation, action)
  };

  console.log(nextState === state, nextState, state)

  if (nextState !== state) {
    return nextState;
  }

  return state;
}
