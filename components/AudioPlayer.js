import React from 'react';
import { connect } from 'react-redux';
import {Text, View, TouchableHighlight, Slider, AppState} from 'react-native';

import { secondsToTime } from '../util/time';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import Sound from 'react-native-sound';


const AudioPlayer = React.createClass({
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
    const sound = new Sound(this.props.file, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        this.setState({ sound });
        this.setState({ duration: this.state.sound.getDuration() });
      } });
    AppState.addEventListener('change', this._handleAppStateChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.interval);
    if (!!this.state.sound) {
      this.state.sound.stop();
    }
    AppState.removeEventListener('change', this._handleAppStateChange);
  },
  _handleAppStateChange: function(currentAppState) {
    if(currentAppState == "background") {
      if (!!this.state.sound) {
        this.state.sound.pause();
        this.setState({ isPlaying: false });
        clearInterval(this.interval);
      }
    } 
    if(currentAppState == "active") {
        //resume();
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
    console.log('this.props.node.id',this.props.node.id);
    console.log('this.props.currentNodeId',this.props.currentNodeId);

    if(this.props.node.id == this.props.currentNodeId)
    {
      this.state.sound.getCurrentTime((seconds) => this.setState({ time: seconds }));
    }
    else
    {
      if (!!this.state.sound) {
        this.state.sound.pause();
        this.setState({ isPlaying: false });
        clearInterval(this.interval);
      }
    }
  },
  render() {
    if (this.state.sound === null) {
      return (
        <Text>Loading</Text>
      );
    } else {
      return (
          <View style={{ flexDirection: 'row' }}>
            <Icon
                name={'volume-up'} 
                color={'black'} 
                style={{fontSize: 47, margin: 10}} />
            <TouchableHighlight onPress={this.handlePress}>
              <Icon
                name={this.state.isPlaying ? 'pause' : 'play'} 
                color={'black'} 
                style={styles.playPauseButton} />
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


const mapStateToProps = (state) => {
  console.log('StationList mapStateToProps state:');
  console.log(state);
  return {
    currentNodeId: state.routes.currentNodeId,
  };
};

export default connect(mapStateToProps)(AudioPlayer);