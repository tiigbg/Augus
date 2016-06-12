import React from 'react';
import {View, Text} from 'react-native';
import { Provider } from 'react-redux';


import { TabBar, Modal, Actions, Scene, Router } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

import ExhibitionList from './containers/ExhibitionList';
import StationList from './containers/StationList';
import StationScreen from './components/StationScreen';
import Map from './containers/Map';

import styles from './styles/styles';

import { configureStore } from './store/Store.js';

class TabIcon extends React.Component {
  render() {
    return (
      <View style={styles.tabIcon}>
        <Icon name={this.props.icontype} size={20} color={this.props.selected ? 'green' :'black'} />
        <Text style={{color: this.props.selected ? 'green' :'black'}}> {this.props.title}</Text>
      </View>
    );
  }
}

const scenes = Actions.create(
  <Scene key="modal" component={Modal} >
    <Scene key="root" hideNavBar={true}>
      <Scene key="tabbar" tabs={true} default="tab1" >
        <Scene key="tab1" title="Stories" icon={TabIcon} icontype="leaf">
          <Scene key="exhibitonList" component={ExhibitionList} title="Utställningar" initial={ true } />
          <Scene key="stationList" component={StationList} title="Station List"  />
          <Scene key="stationScreen" component={StationScreen} title="StationScreen" />
        </Scene>
        <Scene key="tab2" title="Nearby" icon={TabIcon} icontype="map">
          <Scene key="map" component={Map} title="Nearby Stories" initial={ true } />
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);

export default class Augus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {store: configureStore()};
  }
  render() {
    return (
        <Provider store={this.state.store}>
        <Router scenes={scenes} />
      </Provider>
    );
  }
}
