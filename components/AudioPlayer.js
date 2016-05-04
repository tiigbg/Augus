import React, {
  Text,
  View,
  TouchableHighlight,
  Slider,
} from 'react-native';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import Sound from 'react-native-sound';


export default React.createClass({
  getDefaultProps() {
    return {
      time: 0,
      isPlaying: false,
    };
  },
  getInitialState() {
    return {
      time: this.props.time,
      isPlaying: this.props.isPlaying,
      sound: null,
    };
  },
  componentWillMount() {
    const sound = new Sound(this.props.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        this.setState({ sound: sound });
      }});
  },
  handlePress() {
    this.state.sound.getCurrentTime((seconds) => this.setState({ time: seconds }))
    if (this.state.isPlaying){
      this.state.sound.pause();
      this.setState({isPlaying: false});
      clearInterval(this.interval);
    } else {
      this.state.sound.play((success) => {
        this.setState({isPlaying: false});
        clearInterval(this.interval);
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }});
      this.setState({isPlaying: true});
      this.interval = setInterval(this.tick, 100);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.interval);
    this.state.sound.stop()
  },
  tick: function tick() {
    this.state.sound.getCurrentTime((seconds) => this.setState({ time: seconds }))
  },
  render() {
    if (this.state.sound === null) {
      return (
        <Text>Loading</Text>
      );
    }
    else {
      return (
        <TouchableHighlight onPress={this.handlePress}>
          <View>
            <Icon name={this.state.isPlaying? 'pause':'play'} size={60} color={'black'} />
            <Slider value={this.state.time} maximumValue={this.state.sound.getDuration()} onValueChange={(value) => this.state.sound.setCurrentTime(value)} />
            <Text>Duration:{Math.round(this.state.sound.getDuration())} seconds
              Playing:{this.state.isPlaying? 'yes':'no'}
              Current time: {this.state.time}
            </Text>
          </View>
        </TouchableHighlight>

      );}
  },
}
);
