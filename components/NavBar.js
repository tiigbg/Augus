import React from 'react';
import { Text, View, TouchableHighlight, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { findColor, findText, findNode } from '../util/station.js';
import * as NavigationService from '../util/NavigationService';
import { findExhibitionListTitle } from '../util/exhibitionlist.js';



export default class NavBar extends React.Component {
  render() {
    let parentNode;
    if (this.props.node) {
      parentNode = findNode(this.props.node.parent_id, this.props.nodes);
    }

    function goBack() {
      if (parentNode) {
        NavigationService.navigate('StationList', {
          node: parentNode,
          title: findText(parentNode, this.props.texts, 'section', 'title', this.props.language).text,
        });
      } else if (!this.props.noBackButton) {
        NavigationService.navigate('ExhibitionList', { title: findExhibitionListTitle(this.props.language) });
      } // FIXME Should we quit the app here?
      return true;
    }
    //goBack = goBack.bind(this);
    BackHandler.addEventListener('hardwareBackPress', goBack);

    const backgroundColor = findColor(this.props.node, this.props.nodes, true);
    let backButton = (<View />);
    if (!this.props.noBackButton) {
      backButton = (
        <TouchableHighlight onPress={() => {
          if (parentNode) {
            NavigationService.navigate('StationList', {
              node: parentNode,
              title: findText(parentNode, this.props.texts, 'section', 'title', this.props.language).text,
            });
          } else {
            NavigationService.navigate('ExhibitionList', { title: findExhibitionListTitle(this.props.language) });
          }
        }}

          style={{ borderWidth: 3, borderColor: 'black', borderRadius: 5, backgroundColor: 'white' }}
        >
          <Text style={styles.backButton}>
            <Icon name={'level-up'} size={50} color={'black'} style={{ textAlign: 'center', margin: 5, marginTop: 0, marginBottom: 0, }} />
          </Text>
        </TouchableHighlight>);
    }
    let prevButton = (<View />);
    let nextButton = (<View />);
    if (!!this.props.previous && parentNode) {
      prevButton = (
        <TouchableHighlight
          onPress={() => {
            NavigationService.navigate('StationList', {
              node: this.props.previous,
              title: findText(this.props.previous, this.props.texts, 'section', 'title', this.props.language).text,
            });
          }}
          style={{ borderWidth: 3, borderColor: 'black', borderRadius: 5, backgroundColor: 'white' }}
        >
          <Icon name={'arrow-left'} size={50} color={'black'} style={{ textAlign: 'center', margin: 25, marginTop: 5, marginBottom: 0, }} />
        </TouchableHighlight>);
    }
    if (!!this.props.next && parentNode) {
      nextButton = (
        <TouchableHighlight
          onPress={() => {
            NavigationService.navigate('StationList', {
              node: this.props.next,
              title: findText(this.props.next, this.props.texts, 'section', 'title', 'sv').text,
            });
          }
          }
          style={{ borderWidth: 3, borderColor: 'black', borderRadius: 5, backgroundColor: 'white' }}
        >
          <Icon name={'arrow-right'} size={50} color={'black'} style={{ textAlign: 'center', margin: 25, marginTop: 5, marginBottom: 0, }} />
        </TouchableHighlight>);
    }
    return (
      <View style={{
        justifyContent: 'space-between',
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor
      }}>
        <View style={{
          justifyContent: 'space-between',
          flexGrow: 1,
          flexDirection: 'row',
        }}>
          {backButton}
          {prevButton}
          {nextButton}
        </View>
        <View style={{
          justifyContent: 'space-between',
          flexGrow: 1,
          flexDirection: 'row',
        }}>
          <Text style={[styles.station_name, { color: 'white', marginTop: 0, marginBottom: 0, }]}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}
