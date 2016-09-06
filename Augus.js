import React from 'react';
import { Provider, connect } from 'react-redux';
import { Modal, Actions, Scene, Router } from 'react-native-router-flux';

import TabIcon from './components/TabIcon.js';
import ExhibitionList from './containers/ExhibitionList';
import Experiment from './containers/Experiment';
import StationList from './containers/StationList';
import StationScreen from './components/StationScreen';
import Map from './containers/Map';


import { configureStore } from './store/Store.js';

const RouterWithRedux = connect()(Router);

const scenes = Actions.create(
  <Scene key="modal" component={Modal} >
    <Scene key="root" hideNavBar>
      <Scene key="tabbar" tabs default="tab1" >
        <Scene key="tab1" title="Utställningar" icon={TabIcon} icontype="leaf">
          <Scene key="experiment" component={Experiment} title="Experiment"  />
          <Scene key="exhibitonList" component={ExhibitionList} title="Utställningar" initial />
          <Scene key="stationList" component={StationList} title="Station List" />
          <Scene key="stationScreen" component={StationScreen} title="StationScreen" />
        </Scene>
        <Scene key="tab2" title="Karta" icon={TabIcon} icontype="map">
          <Scene key="map" component={Map} title="Nearby Stories" initial />
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);

export default class Augus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { store: configureStore() };
  }
  render() {
    // FIXME remove this after the usertest
    console.disableYellowBox = true;
    return (
      <Provider store={this.state.store}>
        <RouterWithRedux scenes={scenes} />
      </Provider>
    );
  }
}
