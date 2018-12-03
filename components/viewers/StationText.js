import React from 'react';
import {Text, View, TouchableHighlight, Platform } from 'react-native';
import { findNode, findText } from '../../util/station.js';

import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class StationText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  render() {
    const bodyText = findText(this.props.node, this.props.texts, 'section', 'body', this.props.language).text;
    const shortBodyText = bodyText.substring(0, 140)+'...';
    if(bodyText == null) {
      return (<View />);
    }

    if(!this.props.collapse || bodyText.length < 200) {
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <Text style={ styles.stationText } >
            { bodyText }
          </Text>
        </View>
      );
    }

    if(this.state.visible) {
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <Text style={ styles.stationText } >
            { bodyText }
          </Text>

          <View style={{ flexDirection:'row'}}>
            <TouchableHighlight
              onPress={ () => this.setState({ visible: false }) }
            >
              <Icon name={ 'chevron-up' } style={ styles.icon } />
            </TouchableHighlight>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <Text style={ styles.stationText } >
            { shortBodyText }
          </Text>

          <View style={{ flexDirection:'row'}}>
            <TouchableHighlight
              onPress={ () => this.setState({ visible: true }) }
            >
              <Icon name={ 'chevron-down' } style={ styles.icon } />
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}