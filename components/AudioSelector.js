import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import AudioPlayer from './AudioPlayer';

import RNFetchBlob from 'react-native-fetch-blob'

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
class AudioSelector extends React.Component {

  //
  constructor(props) {
    super(props);

    let hasAudio = false;
    let audioLoaded = false;
    let audioFilename = '';
    let audioFile = this.props.audio.find((item)=>{ 
      return item.parent_id == this.props.navigation.state.params.node.id && 
      item.parent_type=='section' && 
      item.language==this.props.language; 
    });

    if(typeof audioFile !== "undefined") {
      hasAudio = true;
      // download audio file and save in state
      RNFetchBlob
      .config({
        fileCache : true,
        key: ''+audioFile.id,
        appendExt : 'mp3', // FIXME should this be fixated to always be mp3?
      })
      .fetch('GET', this.props.baseUrl+'/audioFile/'+audioFile.id, {
        
      })
      .progress((received, total) => {
        this.setState({ audioLoadProgress: received / total });
      })
      .then((res) => {
        audioFilename = res.path();
        this.setState({ audioFilename, audioLoaded: true });
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      });
    }

    this.state = {
      hasAudio,
      audioLoaded,
      audioFilename
    };
  }
  
  //
  render(){
    let audioPlayerView = (
      <View></View>
    );

    // Section audios
    if(this.state.hasAudio) {
      if(this.state.audioLoaded) {
        audioPlayerView = (
          <View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <AudioPlayer 
                  file={ this.state.audioFilename }
                  nodeId={this.props.navigation.state.params.node.id} 
                />
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        );
      } else {        
        if (Platform.OS === 'android') {
          audioPlayerView = (
            <ProgressBarAndroid 
              progress={this.state.audioLoadProgress}
              styleAttr='Horizontal'>
            </ProgressBarAndroid>
          );
        } else {
          audioPlayerView = (
            <ProgressViewIOS 
              progress={this.state.audioLoadProgress}
              progressViewStyle='bar'>
            </ProgressViewIOS >
          );
        }
      }
    }

    return audioPlayerView
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

export default connect(mapStateToProps, mapDispatchToProps)(AudioSelector);