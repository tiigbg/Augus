import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { findColor, findText } from '../util/station.js';
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
    const backgroundColor = findColor(this.props.node, this.props.nodes, true);
    let backButton = (<View />);
    if (!this.props.noBackButton) {
      backButton = (
        <TouchableHighlight onPress={() => Actions.pop()}>
          <Text style={ styles.backButton }>
            <Icon name={'level-up'} size={50} color={'white'} style={{ textAlign: 'center' }} /> 
          </Text>
        </TouchableHighlight>);
    }
    let prevButton = (<View />);
    let nextButton = (<View />);
    if (!!this.props.previous) {
      prevButton = (
        <TouchableHighlight
          onPress={() => {
            console.log('going to previous');
            console.log(this.props.previous);
            Actions.stationList(
            { node: this.props.previous,
              title: findText(this.props.previous, this.props.texts, 'section', 'title', 'sv').text,
              type: ActionConst.PUSH
            });
          }}
        >
          <Icon name={'arrow-left'} size={50} color={'white'} style={{ textAlign: 'center', margin:5 }} />
        </TouchableHighlight>);
    }
    if (!!this.props.next) {
      nextButton = (
        <TouchableHighlight
          onPress={() => Actions.stationList(
            { node: this.props.next,
              title: findText(this.props.next, this.props.texts, 'section', 'title', 'sv').text,
              type: ActionConst.PUSH 
            })
          }
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
