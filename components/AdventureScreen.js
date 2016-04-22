import React, {
  ScrollView,
  Image,
  Text,
  View,
} from 'react-native';

import styles from '../styles/styles';

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
        </ScrollView>
    );
  },
});
