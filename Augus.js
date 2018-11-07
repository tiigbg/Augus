import React from 'react';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';

import * as NavigationService from './util/NavigationService';
import * as AT from './constants/ActionTypes';

import TabIcon from './components/TabIcon.js';
import LanguageSelect from './containers/LanguageSelect';
import ExhibitionScreen from './components/ExhibitionScreen';
import StationScreen from './components/StationScreen';
import ARViewer from './components/ARViewer';
import ARDetector from './containers/ARDetector';

import { configureStore } from './store/Store.js';

export default class Augus extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = { store: configureStore() };
  }

  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  onNavigationStateChange() {
    let currentNodeId = 0;
    let nav = this.navigator.state.nav;

    if (nav.routes[nav.index].params && nav.routes[nav.index].params.node) {
      currentNodeId = nav.routes[nav.index].params.node.id;
    }
    this.state.store.dispatch({ type: AT.NAVIGATOR_STATE_CHANGE, currentNodeId });
    
    /*
    if(this.navigator.state.nav.routes[this.navigator.state.nav.index].params && 
       this.navigator.state.nav.routes[this.navigator.state.nav.index].params.node) {
      currentNodeId = 
        this.navigator.state.nav.routes[this.navigator.state.nav.index].params.node.id;
    }
    this.state.store.dispatch({ type: AT.NAVIGATOR_STATE_CHANGE, currentNodeId });
    */
  }

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

const MainStack = createStackNavigator(
  {
    LanguageSelect: { screen: LanguageSelect },
    ARDetectScreen: { screen: ARDetectScreen },
    
    ExhibitionScreen: { screen: ExhibitionScreen },
    StationScreen: { screen: StationScreen },
    ARViewer: {screen: ARViewer },
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

const RootNavigator = createStackNavigator(
  {
    Main: { screen: MainStack, },
    ARDetectScreen: { screen: ARDetectScreen, }
  }, {
    mode: 'modal',
    headerMode: 'none'
  }
);
