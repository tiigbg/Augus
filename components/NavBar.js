import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { findColor, findText, findNode } from '../util/station.js';
import * as NavigationService from '../util/NavigationService';

export default React.createClass({
  render() {
    let parentNode;
    if (this.props.node) {
      parentNode = findNode(this.props.node.parent_id, this.props.nodes);
    }
    console.log('NavBar render with prev:');
    console.log(this.props.previous);
    console.log('and next:');
    console.log(this.props.next);
    const backgroundColor = findColor(this.props.node, this.props.nodes, true);
    let backButton = (<View />);
    if (!this.props.noBackButton) {
      backButton = (
        <TouchableHighlight onPress={() => {
          if (parentNode) {
            NavigationService.navigate('StationList', { node: parentNode,
              title: findText(parentNode, this.props.texts, 'section', 'title', 'sv').text,
            });
          } else {
            NavigationService.navigate('ExhibitionList');
          } }}
        >
        <Text style={ styles.backButton }>
          <Icon name={'level-up'} size={50} color={'white'} style={{ textAlign: 'center' }} />
        </Text>
      </TouchableHighlight>);
    }
    let prevButton = (<View />);
    let nextButton = (<View />);
    if (!!this.props.previous && parentNode) {
      prevButton = (
        <TouchableHighlight
          onPress={() => {
            console.log('going to previous');
            console.log(this.props.previous);
            NavigationService.navigate('StationList', { node: this.props.previous,
              title: findText(this.props.previous, this.props.texts, 'section', 'title', 'sv').text,
            });
          }}
        >
          <Icon name={'arrow-left'} size={50} color={'white'} style={{ textAlign: 'center', margin:5 }} />
        </TouchableHighlight>);
    }
    if (!!this.props.next && parentNode) {
      nextButton = (
        <TouchableHighlight
          onPress={() => {
            console.log('going to next');
            console.log(this.props.next);
            NavigationService.navigate('StationList', { node: this.props.next,
              title: findText(this.props.next, this.props.texts, 'section', 'title', 'sv').text,
            });
            }
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
