import React from 'react';
import {Text, View, TouchableHighlight, Platform, ProgressBarAndroid, 
  ProgressViewIOS } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob'

import AudioPlayer from './AudioPlayer';

import { findText } from '../../util/station.js';
import styles from '../../styles/styles';

//
export default class ImageCaption extends React.Component {
  constructor(props) {
    super(props);
    let audioFile = this.props.audio.find((item)=>{ return item.parent_id == this.props.image.id && item.parent_type=='image' && item.language==this.props.language; });
    if (typeof audioFile !== "undefined") {
      hasAudio = true;
      RNFetchBlob
      .config({
        fileCache : true,
        key: ''+audioFile.id,
        appendExt : 'mp3',
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
    this.state = {
      visible: this.props.visible,
      hasAudio: false,
      audioLoaded: false,
      audioFilename: '',
      audioFile,
    };
  }

  render() {
    if(this.props.image === null)
      return (<View />);
    const imageDescription = findText(this.props.image, this.props.texts, 'image', 'body', this.props.language).text;
    if(imageDescription == null) // TODO also check if there is no audio either?
      return (<View />);

    let imageAudioPlayerView = (<View />);
    if(this.state.audioLoaded)
    {
      imageAudioPlayerView = (
        <AudioPlayer
          file={ this.state.audioFilename }
          style={{backgroundColor:'#fff', borderColor:'#fff', borderWidth: 3}}
          nodeId={this.props.image.parent_id}/>
      );
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
          { imageAudioPlayerView }
          <Text style={styles.imageDescription} >{imageDescription}</Text>
          <View style={{flexDirection:'row'}}>
            <TouchableHighlight
              onPress={() => this.setState({ visible: false }) }
              //style={ styles.collapseIconTouch }
            >
              <Icon name={'chevron-up'} style={ styles.icon } />
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    else
    {
          /*<Text style={[styles.imageDescription, { height: 30, overflow:'hidden', marginBottom:-15, }]} >{imageDescription}</Text>
          <View style={{ borderBottomWidth:15, borderBottomColor: '#eeeeeedd', marginBottom: 0 }}></View>*/
      return (
        <View style={{ borderWidth: 0, flexGrow: 1, marginTop:-60,}}>
          <View style={{flexDirection:'row'}}>
            <TouchableHighlight
              onPress={() => this.setState({ visible: true }) }
              //style={ styles.collapseIconTouch }
            >
              <Icon name={'chevron-down'} style={ styles.icon } />
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

ImageCaption.defaultProps = {
  visible: false,
  image: null,
};
