/**
 * Root Reducer
 * @flow
 */
import navigation from './navigation';

export default function reducer(
  state,
  action: any
): Object {
  if (!state) {
    return {
      navigation: navigation(state, action)
    };
  }

  const nextState = {
    navigation: navigation(state.navigation, action)
  };

  if (nextState !== state) {
    return nextState;
  }

  return state;
}
