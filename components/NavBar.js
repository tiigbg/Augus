import React from 'react';
import { Text, View, TouchableHighlight, BackAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { findColor, findText, findNode } from '../util/station.js';
import * as NavigationService from '../util/NavigationService';
import { findExhibitionListTitle } from '../util/exhibitionlist.js';



export default React.createClass({
  render() {
    let parentNode;
    if (this.props.node) {
      parentNode = findNode(this.props.node.parent_id, this.props.nodes);
    }

    function goBack() {
      if (parentNode) {
        NavigationService.navigate('StationList', { node: parentNode,
          title: findText(parentNode, this.props.texts, 'section', 'title', this.props.language).text,
        });
      } else if(!this.props.noBackButton) { 
        NavigationService.navigate('ExhibitionList', {title: findExhibitionListTitle(this.props.language)} );
      } // FIXME Should we quit the app here?
      return true;
    }
    goBack = goBack.bind(this);
    BackAndroid.addEventListener('hardwareBackPress', goBack);

    const backgroundColor = findColor(this.props.node, this.props.nodes, true);
    let backButton = (<View />);
    if (!this.props.noBackButton) {
      backButton = (
        <TouchableHighlight onPress={() => {
          if (parentNode) {
            NavigationService.navigate('StationList', { node: parentNode,
              title: findText(parentNode, this.props.texts, 'section', 'title', this.props.language).text,
            });
          } else {
            NavigationService.navigate('ExhibitionList', {title: findExhibitionListTitle(this.props.language)} );
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
            NavigationService.navigate('StationList', { node: this.props.previous,
              title: findText(this.props.previous, this.props.texts, 'section', 'title', this.props.language).text,
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
