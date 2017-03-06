import React from 'react';
import { Provider, connect } from 'react-redux';

import { StackNavigator } from 'react-navigation';
import * as NavigationService from './util/NavigationService';

import TabIcon from './components/TabIcon.js';
import LanguageSelect from './containers/LanguageSelect';
import ExhibitionList from './containers/ExhibitionList';
//import Experiment from './containers/Experiment';
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
  render() {
    console.log("root", this);
    // FIXME remove this after the usertest
    // console.disableYellowBox = true;
    return (
      <Provider store={this.state.store}>
        <AppNavigator ref={(nav) => { this.navigator = nav; }}  />
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
      header: {
        visible: false,
      },
    },
  },
);
