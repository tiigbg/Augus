import React, {
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
    if (this.state.isPlaying){
      this.state.sound.pause();
      this.setState({isPlaying: false});
    } else {
      this.state.sound.play((success) => {
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
    if (this.state.sound === null) {
      return (
        <Text>Loading</Text>
      );
    }
    else {
      return (
        <TouchableHighlight onPress={this.handlePress}>
          <View><Icon name={this.state.isPlaying? 'pause':'play'} size={60} color={'black'} />
            <Text>Duration:{Math.round(this.state.sound.getDuration())} seconds
              Playing:{this.state.isPlaying? 'yes':'no'}
            </Text></View>
        </TouchableHighlight>
      );}
  },
}
);
