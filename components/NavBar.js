import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { findColors } from '../util/station.js';
import { Actions, ActionConst } from 'react-native-router-flux';

export default React.createClass({
  getDefaultProps() {
    return {};
  },
  getInitialState() {
    return {};
  },
  render() {
    console.log('NavBar render');
    const backgroundColor = findColors(this.props.node, this.props.nodes).dark;
    let backButton = (<View />);
    if (!this.props.noBackButton) {
      backButton = (
        <TouchableHighlight onPress={() => Actions.pop()}>
          <Text style={[styles.station_name, { color: 'white', margin: 5 }]}>
            <Icon name={'chevron-left'} size={50} color={'white'} style={{ textAlign: 'center' }} /> 
          </Text>
        </TouchableHighlight>);
    }
    let prevButton = (<View />);
    let nextButton = (<View />);
    if (!!this.props.previous) {
      prevButton = (
        <TouchableHighlight
          onPress={() => Actions.stationScreen(
            { station: this.props.previous,
              title: this.props.previous.name.sv,
              nodes: this.props.nodes,
              type: ActionConst.REFRESH })}
        >
          <Icon name={'arrow-left'} size={50} color={'white'} style={{ textAlign: 'center', margin:5 }} />
        </TouchableHighlight>);
    }
    if (!!this.props.next) {
      nextButton = (
        <TouchableHighlight
          onPress={() => Actions.stationScreen(
            { station: this.props.next,
              title: this.props.next.name.sv,
              nodes: this.props.nodes,
              type: ActionConst.REFRESH })}
        >
          <Icon name={'arrow-right'} size={50} color={'white'} style={{ textAlign: 'center', margin: 5 }} />
        </TouchableHighlight>);
    }
    return (
      <View style={[styles.stationTitlePane, { backgroundColor }]}>
        {backButton}
        {prevButton}
        <Text style={[styles.station_name, { color: 'white' }]}>
          {this.props.title}
        </Text>
        {nextButton}
      </View>
    );
  },
});
