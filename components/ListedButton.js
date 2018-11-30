import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from '../styles/styles';

class ListedButton extends React.Component {

  //
  render() {
    //console.log("ListedButton.render: ", this.props.onPress);
    const { onPress, text, iconPath } = this.props;

    //this.props.baseUrl + '/iconFile/' + symbol.id
    let icon = (<View />);
    if(iconPath){
      icon = (
        <Image
          source={{ uri: iconPath }}
          style={ styles.stationSymbol }
        />
      )
    }

    return(
      <TouchableHighlight
        onPress={ onPress }
        style={ styles.simpleButton }
        underlayColor='rgba(180, 180, 180, 0.9)'
      >
        <View style={ styles.rightContainer }>
          { icon }

          <Text style={ styles.listText }>
            { text }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ListedButton;