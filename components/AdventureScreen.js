import React, {
  ScrollView,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import styles from '../styles/styles';

var Sound = require('react-native-sound');
var beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
  } else { // loaded successfully
    console.log('duration in seconds: ' + beep.getDuration() +
        'number of channels: ' + beep.getNumberOfChannels());
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
        <TouchableHighlight onPress={() =>beep.play()}>
          <Text>Click here to play audio</Text>
        </TouchableHighlight>
        </ScrollView>
    );
  },
});
