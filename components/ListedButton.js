import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from '../styles/styles';

class ListedButton extends React.Component {

  //
  render() {
    console.log("ListedButton.render: ", this.props.onPress);
    const { onPress, text } = this.props;

    return(
      <TouchableHighlight
        onPress={ onPress }
        style={ styles.simpleButton }
      >
        <Text style={ styles.listText }>
          { text }
        </Text>
      </TouchableHighlight>
    );
  }
}

export default ListedButton;