import React, {
  ScrollView,
  Image,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

export default React.createClass({
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
          * omit a property or set it to undefined if it's inside a shape,
          * even if it isn't required */}
          <Image
            source={{ uri: this.props.exhibition.image }}
            style={styles.detailsImage}
          />
          <View style={styles.rightPane}>
            <Text style={styles.adventureTitle}>{this.props.exhibition.exhibition_name.sv}</Text>
            <Text>English: {this.props.exhibition.exhibition_name.en}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.adventureTitle}>{this.props.exhibition.exhibition_name.sv}</Text>
        <AudioPlayer file="urbanum1.mp3" />
        <View style={styles.separator} />
        <VideoPlayer file="bird" />
      </ScrollView>
    );
  },
});
