// See https://github.com/react-community/react-navigation/issues/153
import { NavigationActions, StackActions } from 'react-navigation';

export const config = {};


export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(routeName, params) {
  if (config.navigator && routeName) {
    const action = NavigationActions.navigate({ routeName, params });
    config.navigator.dispatch(action);
  }
}

export function push(routeName, params) {
  if (config.navigator && routeName) {
    const action = StackActions.push({ routeName, params });
    config.navigator.dispatch(action);
  }
}
