import React from 'react';
import {Text, View, TouchableHighlight, Slider} from 'react-native';

import { secondsToTime } from '../util/time';
import Lightbox from 'react-native-lightbox';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import Video from 'react-native-video';

const activeProps = {
  style: styles.lightBox,
};

export default React.createClass({
  getDefaultProps() {
    return {
      time: 0,
      duration: 100,
      isPlaying: false,
    };
  },
  getInitialState() {
    return {
      time: this.props.time,
      duration: this.props.duration,
      isPlaying: this.props.isPlaying,
    };
  },
  handlePress() {
    this.setState({ isPlaying: !this.state.isPlaying });
  },
  onEnd() {
    this.setState({ isPlaying: false });
    this.refs.videoPlayer.seek(0);
    this.setState({ time: 0 });
  },
  render() {
    return (
      <View style={styles.videoPlayer}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 4}}>
          <TouchableHighlight onPress={this.handlePress}>
            <Icon name={this.state.isPlaying? 'pause':'play'} size={60} color={'black'} />
          </TouchableHighlight>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent:'space-between' }}>
              <Text>{secondsToTime(Math.round(this.state.time))}</Text>
              <Text>
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
        <View style={{alignItems: 'center'}}>
          <Video ref="videoPlayer" source={{uri: this.props.file}} // Can be a URL or a local file.
            rate={1.0}                   // 0 is paused, 1 is normal.
            volume={1.0}                 // 0 is muted, 1 is normal.
            muted={false}                // Mut
            paused={!this.state.isPlaying}               // Pauses playback entirely.
            repeat={false}                // Repeat forever.
            onLoadStart={this.loadStart} // Callback when video starts to load
            onLoad={(videoStats) => this.setState({duration:videoStats.duration})}    // Callback when video loads
            onProgress={(progressStats) => this.setState({time:progressStats.currentTime})}    // Callback every ~250ms with currentTime
            onEnd={this.onEnd}           // Callback when playback finishes
            onError={this.videoError}    // Callback when video cannot be loaded
            style={styles.video} />
        </View>
      </View>
    );
  },
});
