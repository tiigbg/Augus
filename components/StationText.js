import React from 'react';
import {Text, View, TouchableHighlight, Platform } from 'react-native';
import { findNode, findText } from '../util/station.js';


import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';


export default React.createClass({
  getInitialState() {
    return {
      visible: false,
    };
  },
  componentWillMount() {
    
  },
  componentWillUnmount: function componentWillUnmount() {
    
  },
  render() {
    const bodyText = findText(this.props.node, this.props.texts, 'section', 'body', this.props.language).text;
    const shortBodyText = bodyText.substring(0, 140)+'...';
    if(bodyText == null)
      return (<View />);

    if(!this.props.collapse || bodyText.length < 200)
    {
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <Text style={styles.imageDescription} >{bodyText}</Text>
        </View>
      );
    }

    if(this.state.visible)
    {
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <Text style={styles.imageDescription} >{bodyText}</Text>
          <View style={{ flexDirection:'row'}}>
            <TouchableHighlight
              onPress={() => this.setState({ visible: false }) }
              style={styles.collapseIconTouch}
            >
              <Icon name={'chevron-up'} style={styles.collapseIcon} />
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    else
    {
          //<View style={{ borderBottomWidth:15, borderBottomColor: '#f0f0f0dd', marginBottom: 0 }}></View>
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <Text style={[styles.imageDescription, {  }]} >{shortBodyText}</Text>
          <View style={{ flexDirection:'row'}}>
            <TouchableHighlight
              onPress={() => this.setState({ visible: true }) }
              style={styles.collapseIconTouch}
            >
              <Icon name={'chevron-down'} size={40} style={styles.collapseIcon} />
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  },
}
);
