import React from 'react';
import { Provider, connect } from 'react-redux';
import { Modal, Actions, Scene, Router } from 'react-native-router-flux';

import TabIcon from './components/TabIcon.js';
import LanguageSelect from './containers/LanguageSelect';
import ExhibitionList from './containers/ExhibitionList';
//import Experiment from './containers/Experiment';
import StationList from './containers/StationList';




import { configureStore } from './store/Store.js';

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  // <Scene key="tabbar" tabs default="tab1" >
  // <Scene key="tab1" title="Utställningar" icon={TabIcon} icontype="leaf">
  // </Scene>
  // </Scene>
  // <Scene key="experiment" component={Experiment} title="Experiment"  />
  // <Scene key="modal" component={Modal} >
//      <Scene key="stationScreen" component={StationScreen} hideNavBar  title="StationScreen" />
    <Scene key="root">
      <Scene key="languageSelect" component={LanguageSelect} hideNavBar  title="Language" initial />
      <Scene key="exhibitionList" component={ExhibitionList} hideNavBar  title="Utställningar" />
      <Scene key="stationList" component={StationList} hideNavBar  title="Station List" />
    </Scene>
  // </Scene>
);

export default class Augus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { store: configureStore() };
  }
  render() {
    // FIXME remove this after the usertest
    // console.disableYellowBox = true;
    return (
      <Provider store={this.state.store}>
        <RouterWithRedux scenes={scenes} />
      </Provider>
    );
  }
}
