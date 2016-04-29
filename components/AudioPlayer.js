import React, {
  ScrollView,
  Image,
  Text,
  View,
  TouchableHighlight,
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
    };
  },
  beep: new Sound('urbanum1.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
    }
  }),
  handlePress() {
    if (this.state.isPlaying){
      this.beep.pause();
      this.setState({isPlaying: false});
    }
    else {
      this.beep.play((success) => {
        this.setState({isPlaying: false});
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }});
      this.setState({isPlaying: true});
    }
  },
  render() {
    return (
      <TouchableHighlight onPress={this.handlePress}>
        <View><Icon name={this.state.isPlaying? 'pause':'play'} size={60} color={'black'} />
          <Text>Duration:{Math.round(this.beep.getDuration())} seconds
            Playing:{this.state.isPlaying? 'yes':'no'}
          </Text></View>
      </TouchableHighlight>
    );
  }
});
