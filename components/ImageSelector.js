import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import ImageCaption from './ImageCaption';

import { findText, findChildren } from '../util/station.js';

import Dimensions from 'Dimensions';
import Lightbox from 'react-native-lightbox';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
class ImageSelector extends React.Component {

  //
  constructor(props){
    super(props);
  }
  
  //
  render(){
    let images = findChildren(
      this.props.navigation.state.params.node, this.props.images);

    if(images.length > 0) {
      return(
        <ScrollView horizontal style={ styles.imageGallery }>
          { this.renderImages(images) }
        </ScrollView>
      );
    }

    return (
      <View></View>
    );
  }

  //
  renderImages(images){
    let imageView = (
      <View></View>
    );

    if(images.length > 0) {
      imageView = (
        <View>
        {
          images.map((eachImage, i) => {
            const imageboxwidth = Dimensions.get('window').width/5*4;
            const imageDescription = findText(
              eachImage, this.props.texts, 'image', 'body', this.props.language).text;
            function renderFullScreenImage() {
              //console.log('renderFullScreenImage with props', this.props);
              return (
                <View>
                  <PhotoView
                    source={{ uri: this.props.baseUrl+'/imageFile/'+eachImage.id }}
                    minimumZoomScale={0.5}
                    maximumZoomScale={5}
                    androidScaleType="center"
                    resizeMode={'contain'}
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
            // Needed to be able to reach props inside function
            renderFullScreenImage = renderFullScreenImage.bind(this);
            function renderLightboxHeader(close) {
              return (
                <TouchableOpacity 
                  onPress={close} 
                  style={styles.closeButtonContainer} 
                  accessibilityLabel={'Close'}
                >
                  <Icon name={'times'} style={styles.closeButton} />
                </TouchableOpacity>
              );
            }
            
            return (
              <Lightbox
                key={i}
                navigator={this.props.navigator}
                activeProps={{ style: styles.lightBox }}
                renderContent={renderFullScreenImage}
                renderHeader={renderLightboxHeader}
                swipeToDismiss={false}
              >
                <View style={[styles.imageGalleryBox, { width: imageboxwidth }]}>
                  <Image
                    source={{ uri: this.props.baseUrl+'/imageFile/'+eachImage.id }}
                    style={styles.detailsImage}
                    resizeMode={'contain'}
                  />
                  <View style={ styles.expandIconBox }>
                    <Icon name={'expand'} style={styles.expandIcon} />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <ImageCaption 
                      texts={this.props.texts} 
                      image={eachImage} 
                      baseUrl={this.props.baseUrl} 
                      audio={this.props.audio} 
                      node={this.props.navigation.state.params.node} 
                      language={this.props.language}
                    />
                  </View>
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