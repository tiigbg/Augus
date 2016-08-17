import React from 'react';
import {ScrollView, Image, Text, View, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Lightbox from 'react-native-lightbox';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

let icon_audio_sv = require('../assets/img/upplast_text.png');
let icon_signlanguage_sv = require('../assets/img/teckensprakstolkning.png');
let icon_text_sv = require('../assets/img/textning.png');

export default React.createClass({
  render() {
    console.log('StationScreen render props:');
    console.log(this.props);
    let imageView = '';
    if (this.props.station.images && this.props.station.images.length > 0) {
      imageView = (<View>
        {
          this.props.station.images.map((eachImage) => {
            return (
              <Lightbox navigator={this.props.navigator} activeProps={{ style: styles.lightBox }}>
                <Image
                  source={{ uri: eachImage.url }}
                  style={styles.detailsImage}
                />
              </Lightbox>
            );
          })
        }
      </View>
      );
      console.log('imageView');
      console.log(imageView);
    }
    else {
      imgUrl = "";
    }
    const station = this.props.station;
    let nodes = this.props.nodes;
    function findPrevious(node) {
      return node && node.parent === station.parent && node.id === station.id - 1;
    }
    function findNext(node) {
      return node && node.parent === station.parent && node.id === station.id + 1;
    }
    let prevStation = nodes.find(findPrevious);
    let nextStation = nodes.find(findNext);
    if (!prevStation) prevStation = station;
    if (!nextStation) nextStation = station;

    console.log('prevStation');
    console.log(prevStation);
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.stationTitlePane}>
        <TouchableHighlight
          onPress={() => Actions.stationScreen(
            { station: prevStation, title: prevStation.name.sv, nodes: this.props.nodes })}
        >
          <Icon name={'arrow-left'} size={60} color={'black'} />
        </TouchableHighlight>
        <Text style={styles.station_name}>{this.props.station.name.sv}</Text>
        <TouchableHighlight
          onPress={() => Actions.stationScreen(
            { station: nextStation, title: prevStation.name.sv, nodes: this.props.nodes })}
        >
          <Icon name={'arrow-right'} size={60} color={'black'} />
        </TouchableHighlight>
      </View>
        <View style={styles.mainSection}>
          {imageView}
        </View>
        <View style={styles.separator} />
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',}}>
          <Image
            source={icon_audio_sv}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <View style={{flex:1,flexDirection:'column', }}>
            <AudioPlayer file="urbanum1.mp3"/>
          </View>
        </View>
        <View style={styles.separator} />
          <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-start',}}>
            <Image
              source={icon_signlanguage_sv}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <View style={{flex:1,flexDirection:'column', }}>
              <VideoPlayer file="bird" />
            </View>
          </View>
        <View style={styles.separator} />
        <Image
          source={icon_text_sv}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text style={styles.station_text}>{this.props.station.text.sv}</Text>
      </ScrollView>
    );
  },
});
