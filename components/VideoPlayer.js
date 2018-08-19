import React from 'react';
import { Text, View, Image, TouchableHighlight, Slider } from 'react-native';

import { secondsToTime } from '../util/time';
import Lightbox from 'react-native-lightbox';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import Video from 'react-native-video';

let icon_signlanguage_sv = require('../assets/img/teckensprakstolkning_opaque.png');

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      duration: this.props.duration,
      isPlaying: this.props.isPlaying,
      isFullScreen: this.props.isFullScreen,
      showSignlanguageIcon: this.props.showSignlanguageIcon,
    };
  }
  onEnd() {
    this.setState({ isPlaying: false });
    if (this.refs.videoPlayer) {
      this.refs.videoPlayer.seek(0);
    }
    this.setState({ time: 0 });
  }
  onFullscreenOpen() {
    this.setState({ isFullScreen: true });
  }
  onFullscreenClose() {
    this.setState({ isFullScreen: false });
  }
  handlePress() {
    this.setState({ isPlaying: !this.state.isPlaying });
  }
  render() {
    return (
        <View style={styles.colStretch}>
          <Lightbox
            navigator={this.props.navigator}
            activeProps={{ style: styles.lightBox }}
            style={styles.colStretch}
            onClose={this.onFullscreenClose}
            onOpen={this.onFullscreenOpen} >
            <Video
              ref="videoPlayer"
              source={{ uri: this.props.file }} // Can be a URL or a local file.
              rate={1.0}                   // 0 is paused, 1 is normal.
              volume={1.0}                 // 0 is muted, 1 is normal.
              muted={false}                // Mut
              resizeMode="contain"
              paused={!this.state.isPlaying}               // Pauses playback entirely.
              repeat={false}                // Repeat forever.
              onLoadStart={this.loadStart} // Callback when video starts to load
              onLoad={
                (videoStats) => this.setState({ duration: videoStats.duration })
              }    // Callback when video loads
              onProgress={
                (progressStats) => {if (this.state.isPlaying) {this.setState({ time: progressStats.currentTime });}}
              }    // Callback every ~250ms with currentTime
              onEnd={this.onEnd}           // Callback when playback finishes
              onError={this.videoError}    // Callback when video cannot be loaded
              style={this.state.isPlaying ? (styles.video) : { height: 0 }}
            />
          </Lightbox>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            { this.props.showSignlanguageIcon ? <Image
                source={icon_signlanguage_sv}
                style={{ width: 50, height: 50, marginRight: 10 }}
              /> : null
            }
            { !this.props.showSignlanguageIcon ? <Icon
                name={'video-camera'}
                style={{ fontSize:44, margin: 10, color:'black' }}
              /> : null
            }
            <TouchableHighlight onPress={this.handlePress}>
              <Icon
                name={this.state.isPlaying ? 'pause' : 'play'}
                color={this.state.isFullScreen ? 'white' : 'black'}
                style={styles.playPauseButton}
              />
            </TouchableHighlight>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: this.state.isFullScreen ? 'white' : 'black' }}>
                  {secondsToTime(Math.round(this.state.time))}
                </Text>
                <Text style={{ color: this.state.isFullScreen ? 'white' : 'black' }}>
                  {secondsToTime(Math.round(this.state.duration - this.state.time))}
                </Text>
              </View>
              <Slider value={this.state.time}
                maximumValue={this.state.duration}
                onValueChange={(value) => (this.refs.videoPlayer.seek(value),
                    this.setState({ time: value }))}
              />
            </View>
          </View>
        </View>
    );
  }
}

VideoPlayer.defaultProps = {
  time: 0,
  duration: 100,
  isPlaying: false,
  isFullScreen: false,
  showSignlanguageIcon: false,
};

