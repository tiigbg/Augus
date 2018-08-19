import React from 'react';
import { Provider, connect } from 'react-redux';

import { StackNavigator } from 'react-navigation';
import * as NavigationService from './util/NavigationService';
import * as AT from './constants/ActionTypes';

import TabIcon from './components/TabIcon.js';
import LanguageSelect from './containers/LanguageSelect';
import ExhibitionList from './containers/ExhibitionList';
import StationList from './containers/StationList';

import { configureStore } from './store/Store.js';

export default class Augus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { store: configureStore() };
  }
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }
  onNavigationStateChange() {
    let currentNodeId = 0;
    
    if(this.navigator.state.nav.routes[this.navigator.state.nav.index].params && this.navigator.state.nav.routes[this.navigator.state.nav.index].params.node)
    {
      currentNodeId = this.navigator.state.nav.routes[this.navigator.state.nav.index].params.node.id;
    }
    this.state.store.dispatch({ type: AT.NAVIGATOR_STATE_CHANGE, currentNodeId });
  }
  render() {
    return (
      <Provider store={this.state.store}>
        <AppNavigator ref={(nav) => { this.navigator = nav; }} onNavigationStateChange={ this.onNavigationStateChange.bind(this) }  />
      </Provider>
    );
  }

}


const AppNavigator = StackNavigator(
  {
    LanguageSelect: { screen: LanguageSelect },
    ExhibitionList: { screen: ExhibitionList },
    StationList: { screen: StationList },
  }, {
    headerMode: 'screen',
    navigationOptions: {
      header: null, // hide the header
    },
    // Disable Navigator transition animations
    transitionConfig: () => ({
      transitionSpec: {
          duration: 0,
      },
  }),
  },
);
