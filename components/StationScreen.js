import React from 'react';
import { ScrollView, Image, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Lightbox from 'react-native-lightbox';
import PhotoView from 'react-native-photo-view';
import Dimensions from 'Dimensions';
import styles from '../styles/styles';
import { findColors } from '../util/station.js';
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
    let imageView = (<View />);
    if (!!this.props.station.images && this.props.station.images.length > 0) {
      imageView = (
        <ScrollView horizontal
          style={{ flex: 1, flexDirection: 'row', width: Dimensions.get('window').width }}
        >
        {
          this.props.station.images.map((eachImage, i) => {
            function renderFullScreenImage() {
              return (
                <PhotoView
                  source={{ uri: eachImage.url }}
                  minimumZoomScale={0.5}
                  maximumZoomScale={5}
                  androidScaleType="center"
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              );
            }
            function renderLightboxHeader(close) {
              return (
                <TouchableOpacity onPress={close} style={styles.closeButtonContainer}>
                  <Icon name={'times'} style={styles.closeButton} />
                </TouchableOpacity>
              );
            }
            return (
              <Lightbox
                key={i}
                navigator={this.props.navigator}
                activeProps={{ style: styles.lightBox }}
                renderContent={renderFullScreenImage}
                renderHeader={renderLightboxHeader}
                swipeToDismiss={false}
              >
                <Image
                  source={{ uri: eachImage.url }}
                  style={styles.detailsImage}
                />
              </Lightbox>
            );
          })
        }
        </ScrollView>
      );
      console.log('imageView');
      console.log(imageView);
    }
    const station = this.props.station;
    const nodes = this.props.nodes;
    const backgroundColor = findColors(station, this.props.nodes).dark;
    function findPrevious(node) {
      return node && node.parent === station.parent && node.id === station.id - 1;
    }
    function findNext(node) {
      return node && node.parent === station.parent && node.id === station.id + 1;
    }
    const prevStation = nodes.find(findPrevious);
    const nextStation = nodes.find(findNext);
    let prevButton = (<View />);
    let nextButton = (<View />);
    if (!!prevStation) {
      prevButton = (
        <TouchableHighlight
          onPress={() => Actions.stationScreen(
            { station: prevStation, title: prevStation.name.sv, nodes: this.props.nodes })}
        >
          <Icon name={'arrow-left'} size={60} color={'white'} style={{ textAlign: 'center' }} />
        </TouchableHighlight>);
    }
    if (!!nextStation) {
      nextButton = (
        <TouchableHighlight
          onPress={() => Actions.stationScreen(
            { station: nextStation, title: nextStation.name.sv, nodes: this.props.nodes })}
        >
          <Icon name={'arrow-right'} size={60} color={'white'} />
        </TouchableHighlight>);
    }
    let audioPlayerView = (<View />);
    if (!!this.props.station.audio.sv && this.props.station.audio.sv != '-') {
      audioPlayerView = (
        <View>
          <View style={styles.separator} />
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={icon_audio_sv}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <AudioPlayer file={this.props.station.audio.sv} />
            </View>
          </View>
        </View>
      );
    }
    let signlanguageView = (<View />);
    if (!!this.props.station.signlanguage.sv && this.props.station.signlanguage.sv != '-') {
      signlanguageView = (
        <View>
          <View style={styles.separator} />
          <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-start',}}>
            <Image
              source={icon_signlanguage_sv}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <View style={{flex:1,flexDirection:'column', }}>
              <VideoPlayer file={this.props.station.signlanguage.sv} />
            </View>
          </View>
        </View>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.stationTitlePane, { backgroundColor }]}>
          {prevButton}
          <Text style={[styles.station_name, { color: 'white' }]}>
            {this.props.station.name.sv}
          </Text>
          {nextButton}
        </View>
        <View style={styles.mainSection}>
          {imageView}
        </View>
        {audioPlayerView}
        {signlanguageView}
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
