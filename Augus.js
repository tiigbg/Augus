import React from 'react';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';

import * as NavigationService from './util/NavigationService';
import * as AT from './constants/ActionTypes';

import LanguageScreen from './components/screens/LanguageSelect';
import ExhibitionScreen from './components/screens/ExhibitionScreen';
import StationScreen from './components/screens/StationScreen';
import MarkerDetectScreen from './components/screens/MarkerDetectScreen';
import ARMeshScreen from './components/screens/ARMeshScreen';

import { configureStore } from './store/Store.js';

//
export default class Augus extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = { store: configureStore() };
  }

  //
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  //
  onNavigationStateChange() {
    let currentNodeId = 0;
    let nav = this.navigator.state.nav;
    let mainNav = nav.routes[0];

    if(mainNav.routes[mainNav.index] && mainNav.routes[mainNav.index].params && 
      mainNav.routes[mainNav.index].params.node){
      currentNodeId = mainNav.routes[mainNav.index].params.node.id;
    }
    this.state.store.dispatch({ type: AT.NAVIGATOR_STATE_CHANGE, currentNodeId });
  }

  //
  render() {
    return (
      <Provider store={this.state.store}>
        <RootNavigator 
          ref = { (nav) => { this.navigator = nav; } } 
          onNavigationStateChange = { this.onNavigationStateChange.bind(this) } 
        />
      </Provider>
    );
  }
}

//
const MainStack = createStackNavigator(
  {
    LanguageScreen: { screen: LanguageScreen },
    ExhibitionScreen: { screen: ExhibitionScreen },
    StationScreen: { screen: StationScreen },
    MarkerDetectScreen: { screen: MarkerDetectScreen },
    ARMeshScreen: { screen: ARMeshScreen }
  }, {
    headerMode: 'screen',
    // Disable Navigator transition animations
    transitionConfig: () => ({
      transitionSpec: {
          duration: 1,
      }
    })
  }
);

//
const RootNavigator = createStackNavigator(
  {
    Main: { screen: MainStack, },
    MarkerDetectScreen: { screen: MarkerDetectScreen, }
  }, {
    mode: 'modal',
    headerMode: 'none'
  }
);
