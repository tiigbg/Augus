import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from '../styles/styles';

class BannerButton extends React.Component {

  //
  render() {
    //console.log("ListedButton.render: ", this.props.onPress);
    const { onPress, text, imagePath } = this.props;

    //this.props.baseUrl + '/iconFile/' + symbol.id
    let image = (<View />);
    if(imagePath){
      image = (
        <Image
          source={{ uri: imagePath }}
          style={ styles.exhibitionImage }
        />
      )
    }

    return(
      <TouchableHighlight
        onPress={ onPress }
        style={ styles.bannerButton }
        underlayColor='rgba(180, 180, 180, 0.9)'
      >
        <View>
          { image }

          <Text style={ styles.bannerButtonText }>
            { text }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default BannerButton;