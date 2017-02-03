import React from 'react';
import {Text, View, TouchableHighlight, Slider, Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
import { findNode, findText } from '../util/station.js';
import AudioPlayer from '../components/AudioPlayer';

import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob'


export default React.createClass({
  getDefaultProps() {
    return {
      visible: false,
      image: null,
    };
  },
  getInitialState() {
    let audioFile = this.props.audio.find((item)=>{ return item.parent_id == this.props.image.id && item.language=='sv'; });
    if (typeof audioFile !== "undefined") {
      hasAudio = true;
      // download audio file and save in state
      RNFetchBlob
      .config({
        fileCache : true,
        appendExt : 'mp3' // FIXME should this be fixated to always be mp3?
      })
      .fetch('GET', this.props.baseUrl+'/audioFile/'+audioFile.id, {
        
      })
      .progress((received, total) => {
        this.setState({ audioLoadProgress: received / total });
      })
      .then((res) => {
        audioFilename = res.path();
        this.setState({ audioFilename, audioLoaded: true });
        console.log(this.state.audioFilename);
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      });
    }
    return {
      visible: this.props.visible,
      hasAudio: false,
      audioLoaded: false,
      audioFilename: '',
      audioFile,
    };
  },
  componentWillMount() {
    
  },
  componentWillUnmount: function componentWillUnmount() {
    
  },
  render() {
    if(this.props.image === null)
      return (<View />);
    const imageDescription = findText(this.props.image, this.props.texts, 'image', 'body', 'sv').text;
    if(imageDescription == null) // TODO also check if there is no audio either?
      return (<View />);

    let imageAudioPlayerView = (<View />);
    if(this.state.audioLoaded)
    {
      imageAudioPlayerView = (<AudioPlayer file={ this.state.audioFilename } style={{backgroundColor:'#fff', borderColor:'#fff', borderWidth: 3}} />);
    }
    else
    {
      if (Platform.OS === 'android') {
        audioPlayerView = (<ProgressBarAndroid progress={this.state.audioLoadProgress}  styleAttr='Horizontal'></ProgressBarAndroid>)
      }
      else
      {
        audioPlayerView = (<ProgressViewIOS progress={this.state.audioLoadProgress} progressViewStyle='bar'></ProgressViewIOS >);
      }
    }

    if(this.state.visible)
    {
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <View>
            <TouchableHighlight
              onPress={() => this.setState({ visible: false }) }
            >
              <Icon name={'chevron-up'} style={styles.collapseIcon} />
            </TouchableHighlight>
          </View>
          { imageAudioPlayerView }
          <Text style={styles.imageDescription} >{imageDescription}</Text>
        </View>
      );
    }
    else
    {
      return (
        <View style={{ borderWidth: 0, flexGrow: 1}}>
          <View>
            <TouchableHighlight
              onPress={() => this.setState({ visible: true }) }
            >
              <Icon name={'chevron-down'} style={styles.collapseIcon} />
            </TouchableHighlight>
          </View>
          <Text style={[styles.imageDescription, { height: 30, overflow:'hidden', marginBottom:-15, }]} >{imageDescription}</Text>
          <View style={{ borderBottomWidth:15, borderBottomColor: '#eeeeeedd', marginBottom: 0 }}></View>
        </View>
      );
    }
  },
}
);
