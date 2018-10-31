import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import VideoPlayer from './VideoPlayer';

import RNFetchBlob from 'react-native-fetch-blob'

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
class VideoViewer extends React.Component {

  //
  constructor(props) {
    super(props);

    let hasVideo = false;
    let videoLoaded = false;
    let videoFilename = '';
    let videoFile = this.props.video.find((item)=>{ 
      return item.parent_id == this.props.navigation.state.params.node.id && 
      item.language==this.props.language; });

    if(typeof videoFile !== "undefined") {
      hasVideo = true;
      RNFetchBlob
      .config({
        fileCache : true,
        key: ''+videoFile.id,
        appendExt : 'mp4',
      })
      .fetch('GET', this.props.baseUrl+'/videoFile/'+videoFile.id, {
        
      })
      .progress((received, total) => {
        this.setState({ videoLoadProgress: received / total });
      })
      .then((res) => {
        videoFilename = res.path();
        this.setState({ videoFilename, videoLoaded: true });
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      });
    }

    this.state = {
      hasVideo,
      videoLoaded,
      videoFilename
    };
  }
  
  //
  render(){
    let videoPlayerView = (
      <View></View>
    );

    // Section Videos
    if(this.state.hasVideo) {
      if(this.state.videoLoaded) {
        videoPlayerView = (
          <View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <VideoPlayer file={ this.state.videoFilename } />
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        );
      } else {
        if (Platform.OS === 'android') {
          videoPlayerView = (<ProgressBarAndroid progress={this.state.videoLoadProgress}  styleAttr='Horizontal'></ProgressBarAndroid>)
        } else {
          videoPlayerView = (<ProgressViewIOS progress={this.state.videoLoadProgress} progressViewStyle='bar'></ProgressViewIOS >);
        }
      }
    }

    return videoPlayerView;
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoViewer);