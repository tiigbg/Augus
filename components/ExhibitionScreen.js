import React, {
  ScrollView,
  Image,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Lightbox from 'react-native-lightbox';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

export default React.createClass({
  render() {
    if(this.props.station.images.length > 0) {
      imgUrl = this.props.station.images[0].url;
    }
    else {
      imgUrl = "";
    }
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
          * omit a property or set it to undefined if it's inside a shape,
          * even if it isn't required */}
        <Lightbox navigator={this.props.navigator} activeProps={{style: styles.lightBox}}>
          <Image
              source={{ uri: imgUrl }}
              style={styles.detailsImage}
          />
        </Lightbox>
          <View style={styles.rightPane}>
            <Text style={styles.adventureTitle}>{this.props.station.station_name.sv}</Text>
            <Text>English: {this.props.station.station_name.en}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <AudioPlayer file="urbanum1.mp3" />
        <View style={styles.separator} />
        <VideoPlayer file="bird" />
        <View style={styles.separator} />
        <Text style={styles.station_text}>{this.props.station.text.sv}</Text>
      </ScrollView>
    );
  },
});
