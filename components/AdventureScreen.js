import React, {
  ScrollView,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

var Sound = require('react-native-sound');
var beep = new Sound('urbanum1.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
  } else { // loaded successfully
    console.log('duration in seconds: ' + beep.getDuration() +
        'number of channels: ' + beep.getNumberOfChannels());
  }
});

var AudioPlayer = React.createClass({
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

   render() {
    return (
      <TouchableHighlight onPress={() =>{
        if(this.state.isPlaying){
          beep.pause();
          this.setState({isPlaying: false});
        }
        else {
          beep.play((success) => {
            this.setState({isPlaying: false});
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }});
          this.setState({isPlaying: true});
        }
      }}>
        <View><Icon name={this.state.isPlaying? 'pause':'play'} size={60} color={'black'} />
        <Text>Duration:{Math.round(beep.getDuration())} seconds
         Playing:{this.state.isPlaying? 'yes':'no'}
        </Text></View>
      </TouchableHighlight>
    );
  }
});



export default React.createClass({
  render() {
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
        {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
          * omit a property or set it to undefined if it's inside a shape,
          * even if it isn't required */}
          <Image
            source={{ uri: this.props.adventure.thumbnail }}
            style={styles.detailsImage}
          />
        <View style={styles.rightPane}>
        <Text style={styles.adventureTitle}>{this.props.adventure.title}</Text>
        <Text>Players: {this.props.adventure.players}</Text>
        </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.adventureTitle}>{this.props.adventure.title}</Text>
        <AudioPlayer />
        </ScrollView>
    );
  },
});
