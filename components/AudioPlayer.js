import React from 'react';
import {Text, View, TouchableHighlight, Slider} from 'react-native';

import { secondsToTime } from '../util/time';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import Sound from 'react-native-sound';


export default React.createClass({
  getDefaultProps() {
    return {
      time: 0,
      duration: 0,
      isPlaying: false,
    };
  },
  getInitialState() {
    return {
      time: this.props.time,
      duration: this.props.duration,
      isPlaying: this.props.isPlaying,
      sound: null,
    };
  },
  componentWillMount() {
    const sound = new Sound(this.props.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        this.setState({ sound });
        this.setState({ duration: this.state.sound.getDuration() });
      } });
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.interval);
    if (!!this.state.sound) {
      this.state.sound.stop();
    }
  },
  handlePress() {
    this.state.sound.getCurrentTime((seconds) => this.setState({ time: seconds }));
    if (this.state.isPlaying) {
      this.state.sound.pause();
      this.setState({ isPlaying: false });
      clearInterval(this.interval);
    } else {
      this.state.sound.play((success) => {
        this.setState({ isPlaying: false });
        clearInterval(this.interval);
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        } });
      this.setState({ isPlaying: true });
      this.interval = setInterval(this.tick, 100);
    }
  },
  tick: function tick() {
    this.state.sound.getCurrentTime((seconds) => this.setState({ time: seconds }));
  },
  render() {
    if (this.state.sound === null) {
      return (
        <Text>Loading</Text>
      );
    } else {
      return (
          <View style={styles.mainSection}>
            <TouchableHighlight onPress={this.handlePress}>
              <Icon name={this.state.isPlaying ? 'pause' : 'play'} size={60} color={'black'} />
            </TouchableHighlight>
            <View style={{ flex:1, flexDirection: 'column' }}>
              <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={{ color: 'black' }}>{secondsToTime(Math.round(this.state.time))}</Text>
                <Text style={{ color: 'black' }}>
                  {secondsToTime(Math.round(this.state.duration - this.state.time))}
                </Text>
              </View>
              <Slider value={this.state.time}
                maximumValue={this.state.sound.getDuration()}
                onValueChange={(value) => (this.state.sound.setCurrentTime(value),
                                            this.setState({ time: value }))}
              />
            </View>
          </View>
      );
    }
  },
}
);
