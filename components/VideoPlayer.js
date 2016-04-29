import React, {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import Video from 'react-native-video';

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
  handlePress() {
    this.setState({ isPlaying: !this.state.isPlaying });
  },
  render() {
    return (
      <View style={styles.mainSection}>
        <TouchableHighlight onPress={this.handlePress}>
          <View>
            <Icon name={this.state.isPlaying? 'pause':'play'} size={60} color={'black'} />
            <Text>
              Playing:{this.state.isPlaying? 'yes':'no'}
            </Text>
          </View>
        </TouchableHighlight>
        <Video style={styles.video} source={{uri: this.props.file}} // Can be a URL or a local file.
          rate={1.0}                   // 0 is paused, 1 is normal.
          volume={1.0}                 // 0 is muted, 1 is normal.
          muted={false}                // Mutes the audio entirely.
          paused={!this.state.isPlaying}               // Pauses playback entirely.
          repeat={true}                // Repeat forever.
          onLoadStart={this.loadStart} // Callback when video starts to load
          onLoad={this.setDuration}    // Callback when video loads
          onProgress={this.setTime}    // Callback every ~250ms with currentTime
          onEnd={this.onEnd}           // Callback when playback finishes
          onError={this.videoError}    // Callback when video cannot be loaded
          style={styles.video} />
      </View>
    );
  },
});
