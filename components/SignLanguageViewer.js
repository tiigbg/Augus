import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import VideoPlayer from './VideoPlayer';

import RNFetchBlob from 'react-native-fetch-blob'

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
class SignLanguageViewer extends React.Component {

  //
  constructor(props) {
    super(props);

    let hasSignlanguage = false;
    let signlanguageLoaded = false;
    let signlanguageFilename = '';
    let signlanguageFile = this.props.signlanguages.find((item)=>{ 
      return item.parent_id == this.props.navigation.state.params.node.id && 
      item.language==this.props.language; });

    if(typeof signlanguageFile !== "undefined" && this.props.displaySignlanguage) {
      hasSignlanguage = true;
      RNFetchBlob
      .config({
        fileCache : true,
        key: ''+signlanguageFile.id,
        appendExt : 'mp4',
      })
      .fetch('GET', this.props.baseUrl+'/signlanguageFile/'+signlanguageFile.id, {
        
      })
      .progress((received, total) => {
        this.setState({ signlanguageLoadProgress: received / total });
      })
      .then((res) => {
        signlanguageFilename = res.path();
        this.setState({ signlanguageFilename, signlanguageLoaded: true });
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      });
    }

    this.state = {
      hasSignlanguage,
      signlanguageLoaded,
      signlanguageFilename
    };
  }
  
  //
  render(){
    let signlanguageView = (
      <View></View>
    );

    if(this.state.hasSignlanguage && this.props.displaySignlanguage) {
      if(this.state.signlanguageLoaded) {
        signlanguageView = (
          <View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <VideoPlayer 
                  file={ this.state.signlanguageFilename } 
                  showSignlanguageIcon={ true } 
                />
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        );
      } else {
        if (Platform.OS === 'android') {
          signlanguageView = (
            <ProgressBarAndroid 
              progress={this.state.signlanguageLoadProgress}
              styleAttr='Horizontal'>
            </ProgressBarAndroid>
          );
        } else {
          signlanguageView = (
            <ProgressViewIOS 
              progress={this.state.signlanguageLoadProgress} 
              progressViewStyle='bar'>
            </ProgressViewIOS >
          );
        }
      }
    }

    return signlanguageView;
  }
}

//
const mapStateToProps = (state) => {
  return {
    nodes: state.exhibitions.nodes,
    texts: state.exhibitions.texts,
    images: state.exhibitions.images,
    icons: state.exhibitions.icons,
    audio: state.exhibitions.audio,
    video: state.exhibitions.video,
    signlanguages: state.exhibitions.signlanguages,
    loaded: state.exhibitions.loaded,
    baseUrl: state.settings.baseUrl,
    language: state.settings.language,
    displaySignlanguage: state.settings.displaySignlanguage
  };
};

//
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMuseumData: (baseUrl) => {
      dispatch({ type: AT.MUSEUM_DATA_FETCH_REQUESTED, payload: 
        { REQUEST_URL: baseUrl + '/alldata' } });
    },
    loadFromCache: (data) => {
      dispatch({ type: AT.MUSEUM_DATA_LOADED_FROM_CACHE, data });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignLanguageViewer);