import React from 'react';
import { Text, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import ImageCaption from '../viewers/ImageCaption';

import Dimensions from 'Dimensions';
import Lightbox from 'react-native-lightbox';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import { findText, findChildren } from '../../util/station.js';
import * as AT from '../../constants/ActionTypes';
import styles from '../../styles/styles';

// Presents available images, packaging them in a LightBox
class ImageSelector extends React.Component {

  //
  constructor(props){
    super(props);
  }
  
  // Render available images for the current navigation node
  render(){
    // Retrieve related images to the current navigation node
    let images = 
      findChildren(this.props.navigation.state.params.node, this.props.images);

    // If any image retrieved, render each image
    if(images.length > 0) {
      return(
        <ScrollView horizontal style={ styles.imageGallery }>
          { this.renderImages(images) }
        </ScrollView>
      );
    }

    // If no images, render empty view
    return (
      <View></View>
    );
  }

  //
  renderItem (baseUrl, {item, index}) {
    console.log("ImageSelector.renderItem: ", baseUrl + '/imageFile/', item);

    return (
      <View style={ styles.slide }>
        <Image
          source={{ uri: baseUrl + '/imageFile/' + item.id }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  // Renders each image, given array of images, using LightBox
  renderImages(images) {
    let imageView = (
      <View></View>
    );

    let renderLightboxHeader = this.renderLightboxHeader;
    let renderFullScreenImage = this.renderFullScreenImage;
    let baseUrl = this.props.baseUrl;

    if(images.length > 0) {
      imageView = (
        <View>
        {
          images.map((eachImage, i) => {
            const imageboxwidth = Dimensions.get('window').width;// / 5 * 4;
            /* const imageDescription = findText(
              eachImage, this.props.texts, 'image', 'body', this.props.language).text; */

            function renderFullScreen() {
              renderFullScreenImage(baseUrl, eachImage);
            }
            // Needed to be able to reach props inside function
            renderFullScreen = renderFullScreen.bind(this);

            /* function renderLightboxHeader(close) {
              return (
                <TouchableOpacity 
                  onPress={ close } 
                  style={ styles.closeButtonContainer } 
                  accessibilityLabel={ 'Close' }
                >
                  <Icon 
                    name={ 'times' } 
                    style={ styles.closeButton } 
                  />
                </TouchableOpacity>
              );
            } */
            
            return (
              <Lightbox
                key={ i }
                navigator={ this.props.navigator }
                activeProps={{ style: styles.lightBox }}
                //renderContent={ renderFullScreen }
                //renderHeader={ renderLightboxHeader }
                swipeToDismiss={ true }
              >
                <View style={ [styles.imageGalleryBox, { width: imageboxwidth }] }>
                  <Image
                    source={{ uri: this.props.baseUrl + '/imageFile/' + eachImage.id }}
                    style={ styles.detailsImage }
                    resizeMode={ 'cover' }
                  />

                  <View style={{ flexDirection: 'row' }}>
                    <ImageCaption 
                      texts={ this.props.texts } 
                      image={ eachImage } 
                      baseUrl={ this.props.baseUrl } 
                      audio={ this.props.audio } 
                      node={ this.props.navigation.state.params.node } 
                      language={ this.props.language }
                    />
                  </View>

                  <Image
                    source={ require('../../res/gradient_h.png') }
                    tintColor={ styles.backColor }
                    style={{ 
                      position: 'absolute',
                      bottom: 0,
                      width: Dimensions.get('window').width,
                      height: 32,
                      resizeMode: 'stretch'
                    }}
                  />
                </View>
              </Lightbox>
            );
          })
        }
        </View>
      );
    }

    return imageView;
  }

  // 
  renderLightboxHeader(close) {
    return (
      <TouchableOpacity 
        onPress={ close } 
        style={ styles.closeButtonContainer } 
        accessibilityLabel={ 'Close' }
      >
        <Icon 
          name={ 'times' } 
          style={ styles.closeButton } 
        />
      </TouchableOpacity>
    );
  }

  // 
  renderFullScreenImage(baseUrl, eachImage) {
    console.log('renderFullScreenImage: ', baseUrl, ", ", eachImage);

    return (
      <View>
        <PhotoView
          source={{ uri: baseUrl + '/imageFile/' + eachImage.id }}
          minimumZoomScale={ 0.5 }
          maximumZoomScale={ 5 }
          androidScaleType="center"
          resizeMode={ 'contain' }
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    );
    /* <Text style={{ color: '#fff', marginTop: -100, fontSize: 28 }}>
      {imageDescription}
    </Text> */
  }
}

//
const mapStateToProps = (state) => {
  return {
    texts: state.exhibitions.texts,
    images: state.exhibitions.images,
    audio: state.exhibitions.audio,
    baseUrl: state.settings.baseUrl,
    language: state.settings.language
  };
};

//
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMuseumData: (baseUrl) => {
      //console.log("Time to fetch from", baseUrl);
      dispatch({ 
        type: AT.MUSEUM_DATA_FETCH_REQUESTED, 
        payload: { REQUEST_URL: baseUrl + '/alldata' } 
      });
    },
    loadFromCache: (data) => {
      dispatch({ 
        type: AT.MUSEUM_DATA_LOADED_FROM_CACHE, 
        data 
      });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelector);