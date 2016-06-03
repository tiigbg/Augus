import React from 'react';
import {ScrollView, Image, Text, View, TouchableHighlight} from 'react-native';

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
    if(this.props.station.images.length > 0) {
      imgUrl = this.props.station.images[0].url;
    }
    else {
      imgUrl = "";
    }
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.rightPane}>
      <Text style={styles.adventureTitle}>{this.props.station.station_name.sv}</Text>
      </View>
        <View style={styles.mainSection}>
          {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
          * omit a property or set it to undefined if it's inside a shape,
          * even if it isn't required */}
        <Lightbox navigator={this.props.navigator} activeProps={{style: styles.lightBox}}>
          <Image
              source={{ uri: imgUrl }}
              style={styles.detailsImage}
          />
        </Lightbox>
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
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',}}>
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
