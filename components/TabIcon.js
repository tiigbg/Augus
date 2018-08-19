import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default TabIcon = () => {
  <View style={styles.tabIcon}>
    <Icon name={this.props.icontype} size={20} color={this.props.selected ? 'green' : 'black'} />
    <Text style={{ color: this.props.selected ? 'green' : 'black' }}> {this.props.title}</Text>
  </View>
}
