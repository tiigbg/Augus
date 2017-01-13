import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, ScrollView, Image, ListView, TouchableHighlight, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';
import { findColors, findSymbol, findNode, findText, findChildren } from '../util/station.js';
import NavBar from '../components/NavBar';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from '../components/VideoPlayer';
import Dimensions from 'Dimensions';
import Lightbox from 'react-native-lightbox';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'


let icon_audio_sv = require('../assets/img/upplast_text.png');
let icon_signlanguage_sv = require('../assets/img/teckensprakstolkning_opaque.png');
let icon_text_sv = require('../assets/img/textning.png');

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

let renderSectionHeaders = false;

const StationList = React.createClass({
  getInitialState() {
    console.log('StationList getInitialState props:');
    console.log(this.props);
    const nodes = this.props.nodes;
    // const exhibition = nodes[this.props.node.id];
    const exhibition = findNode(this.props.node.id, nodes);
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    sectionIDs.push(`0`);
    rowIDs[`0`] = [];
    for (const id in nodes){
      // don't confuse museum sections and list sections here
      const node = nodes[id];
      console.log('going through nodes (id='+id+')');
      if (node.parent_id === exhibition.id) {
        console.log('Found child node with id='+node.id);
        // sectionIDs.push(`${id}`);
        // rowIDs.push(`${id}`);
        rowIDs[0].push(`${id}`);
        dataBlob[`0:${id}`] = `0:${id}`;
        // rowIDs[`${id}`] = [];
        // rowIDs.push([]);
        // add all stations for this section
        // for (const subId in nodes) {
        //   const subNode = nodes[subId];
        //   if (subNode.parent === node.id) {
        //     rowIDs[rowIDs.length-1].push(`${subId}`);
        //     dataBlob[`${id}:${subId}`] = `${id}:${subId}`;
        //   }
        // }
      }
    }
    renderSectionHeaders = false;
    if (sectionIDs.length > 1 ) {
      console.log('sectionIDs.length='+sectionIDs.length);
      renderSectionHeaders = true;
    }
    console.log(renderSectionHeaders);
    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);

    let hasAudio = false;
    let audioLoaded = false;
    let audioFilename = '';
    let audioFile = this.props.audio.find((item)=>{ return item.parent_id == this.props.node.id && item.language=='sv'; });
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

    let hasSignlanguage = false;
    let signlanguageLoaded = false;
    let signlanguageFilename = '';
    let signlanguageFile = this.props.signlanguages.find((item)=>{ return item.parent_id == this.props.node.id && item.language=='sv'; });
    if (typeof signlanguageFile !== "undefined") {
      hasSignlanguage = true;
      // download audio file and save in state
      RNFetchBlob
      .config({
        fileCache : true,
        // appendExt : 'mp3' // FIXME should this be fixated to always be mp3?
      })
      .fetch('GET', this.props.baseUrl+'/signlanguageFile/'+signlanguageFile.id, {
        
      })
      .progress((received, total) => {
        this.setState({ signlanguageLoadProgress: received / total });
      })
      .then((res) => {
        signlanguageFilename = res.path();
        this.setState({ signlanguageFilename, signlanguageLoaded: true });
        console.log('done loading signlanguage with filename:');
        console.log(this.state.signlanguageFilename);
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      });
    }

    let hasVideo = false;
    let videoLoaded = false;
    let videoFilename = '';
    let videoFile = this.props.video.find((item)=>{ return item.parent_id == this.props.node.id && item.language=='sv'; });
    if (typeof videoFile !== "undefined") {
      hasVideo = true;
      // download video file and save in state
      RNFetchBlob
      .config({
        fileCache : true,
        // appendExt : 'mp3' // FIXME should this be fixated to always be mp3?
      })
      .fetch('GET', this.props.baseUrl+'/videoFile/'+videoFile.id, {
        
      })
      .progress((received, total) => {
        this.setState({ videoLoadProgress: received / total });
      })
      .then((res) => {
        videoFilename = res.path();
        this.setState({ videoFilename, videoLoaded: true });
        console.log('done loading video with filename:');
        console.log(this.state.videoFilename);
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      });
    }

    return {
      myDataSource,
      renderSectionHeaders,
      hasAudio,
      audioLoaded,
      audioFilename,
      hasSignlanguage,
      signlanguageLoaded,
      signlanguageFilename,
      hasVideo,
      videoLoaded,
      videoFilename,
    };
  },
  renderRow(rowData, sectionID, rowID) {
    console.log('stationList renderRow '+sectionID+':'+rowID);
    console.log(rowData);
    const station = this.props.nodes[rowID];
    let title = findText(station, this.props.texts, 'section', 'title', 'sv').text;
    let openFunction = () => Actions.stationList({ node: station, title });
    if (station.type === 'leaf') {
      openFunction = () => Actions.stationScreen(
        { station, title, nodes: this.props.nodes }
      );
    }
    const symbolUrl = findSymbol(station, this.props.nodes);
    let symbol = (<View />);
    if (symbolUrl !== '') {
      symbol = (
        <Image
          source={{ uri: symbolUrl }}
          style={styles.stationSymbol}
        />);
    }
    const backgroundColor = findColors(station, this.props.nodes).light;
    const borderColor = findColors(station, this.props.nodes).dark;
    return (
      <View>
        <TouchableHighlight
          onPress={openFunction}
        >
          <View style={[styles.listContainer, { backgroundColor, borderColor, borderWidth: 3 }]}>
            <View style={styles.rightContainer}>
              {symbol}
              <Text style={[styles.listText, { color: '#000' }]}>
                {title}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  renderSectionHeader(sectionData, sectionID) {
    if (!this.state.renderSectionHeaders) {
      return (<View></View>);
    }
    console.log('stationList renderSectionHeader '+sectionID);
    const section = this.props.nodes[sectionID];
    let title = findText(section, this.props.texts, 'section', 'title', 'sv').text;
    console.log(title);
    const backgroundColor = findColors(section, this.props.nodes).dark;
    return (
      // <TouchableHighlight onPress={() => Actions.stationList({ sectionID })}>
      //   <View style={styles.listContainer}>
      //     <Image
      //       source={{ uri: exhibition.image }}
      //       style={styles.exhibitionImage}
      //     />
      //     <Text style={styles.listText}>{exhibition.exhibition_name.sv}</Text>
      //   </View>
      // </TouchableHighlight>
      <View>
        <View style={[styles.listContainer, { backgroundColor }]}>
          <View style={styles.rightContainer}>
            <Text
              style={[styles.listText, { fontWeight: 'bold',color: '#fff' }]}
            >
              {title}
            </Text>
          </View>
        </View>
      </View>
    );
  },
  render() {
    // if (this.props.dataSource == null) {
    //   console.log('Datasource null');
    //   return (
    //     <Text>loading</Text>
    //     );
    // }
    let navbar = (
      <NavBar
        title={this.props.title}
        node={this.props.node}
        nodes={this.props.nodes}
      />);
    console.log('stationlist render after navbar')
    console.log(this.props)
    let imageView = (
      <View></View>
    );
    let audioPlayerView = (
      <View></View>
    );
    let signlanguageView = (
      <View></View>
    );
    let videoPlayerView = (
      <View></View>
    );
    let textView = (
      <Text></Text>
    );
    let images = findChildren(this.props.node, this.props.images);
    if(images.length > 0) {
      imageView = (
        <ScrollView horizontal
          style={{ flex: 1, flexDirection: 'row', width: Dimensions.get('window').width }}
        >
        {
          images.map((eachImage, i) => {
            const imageboxwidth = Dimensions.get('window').width/3*2;
            const imageDescription = findText(eachImage, this.props.texts, 'image', 'body', 'sv').text;
            function renderFullScreenImage() {
              console.log('renderFullScreenImage with props');
              console.log(this.props);
              return (
                <View>
                  <PhotoView
                    source={{ uri: this.props.baseUrl+'/imageFile/'+eachImage.id }}
                    minimumZoomScale={0.5}
                    maximumZoomScale={5}
                    androidScaleType="center"
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Text style={{ color: '#fff', marginTop: -100, fontSize: 28 }}>{imageDescription}</Text>
                </View>
              );
            }
            // Needed to be able to reach props inside function
            renderFullScreenImage = renderFullScreenImage.bind(this);
            function renderLightboxHeader(close) {
              return (
                <TouchableOpacity onPress={close} style={styles.closeButtonContainer} accessibilityLabel={'Close'}>
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
                <View style={{ width: imageboxwidth, justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={{ uri: this.props.baseUrl+'/imageFile/'+eachImage.id }}
                    style={styles.detailsImage}
                  />
                  <Text style={styles.imageDescription} >{imageDescription}</Text>
                </View>
              </Lightbox>
            );
          })
        }
        </ScrollView>
      );
    }
    if(this.state.hasAudio) {
      if(this.state.audioLoaded) {
        audioPlayerView = (
          <View>
            <View style={styles.separator} />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <AudioPlayer file={ this.state.audioFilename } />
              </View>
            </View>
          </View>
        );
      }
      else {        
        if (Platform.OS === 'android') {
          audioPlayerView = (<ProgressBarAndroid progress={this.state.audioLoadProgress}  styleAttr='Horizontal'></ProgressBarAndroid>)
        }
        else
        {
          audioPlayerView = (<ProgressViewIOS progress={this.state.audioLoadProgress} progressViewStyle='bar'></ProgressViewIOS >);
        }
      }
    }
    if(this.state.hasSignlanguage) {
      if(this.state.signlanguageLoaded) {
        signlanguageView = (
          <View>
            <View style={styles.separator} />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <VideoPlayer file={ this.state.signlanguageFilename } showSignlanguageIcon={ true } />
              </View>
            </View>
          </View>
        );
      }
      else {
        if (Platform.OS === 'android') {
          signlanguageView = (<ProgressBarAndroid progress={this.state.signlanguageLoadProgress}  styleAttr='Horizontal'></ProgressBarAndroid>)
        }
        else
        {
          signlanguageView = (<ProgressViewIOS progress={this.state.signlanguageLoadProgress} progressViewStyle='bar'></ProgressViewIOS >);
        }
      }
    }

    if(this.state.hasVideo) {
      if(this.state.videoLoaded) {
        videoPlayerView = (
          <View>
            <View style={styles.separator} />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <VideoPlayer file={ this.state.videoFilename } />
              </View>
            </View>
          </View>
        );
      }
      else {
        if (Platform.OS === 'android') {
          videoPlayerView = (<ProgressBarAndroid progress={this.state.videoLoadProgress}  styleAttr='Horizontal'></ProgressBarAndroid>)
        }
        else
        {
          videoPlayerView = (<ProgressViewIOS progress={this.state.videoLoadProgress} progressViewStyle='bar'></ProgressViewIOS >);
        }
      }
    }
    let description = findText(this.props.node, this.props.texts, 'section', 'body', 'sv');
    if ('parent_id' in description)
    {
      textView = (
        <View>
          <Text style={styles.station_text}>{description.text}</Text>
          <View style={styles.separator} />
        </View>
      );
    }
    let stationView = (
      <View style={styles.contentContainer}>
        <View style={styles.mainSection}>
          {imageView}
        </View>
        {audioPlayerView}
        {signlanguageView}
        {videoPlayerView}
        {textView}
      </View>
    );
    return (
      <View style={styles.screenContainer}>
        <View>{navbar}</View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {stationView}
          <ListView
            style={styles.listMargin}
            dataSource={myDataSource}
            renderRow={this.renderRow}
            renderSectionHeader={this.renderSectionHeader}
            enableEmptySections
          />
        </ScrollView>
      </View>
    );
  },
});

const mapStateToProps = (state) => {
  console.log('StationList mapStateToProps state:');
  console.log(state);
  return {
    nodes: state.exhibitions.nodes,
    texts: state.exhibitions.texts,
    images: state.exhibitions.images,
    audio: state.exhibitions.audio,
    video: state.exhibitions.video,
    signlanguages: state.exhibitions.signlanguages,
    loaded: state.exhibitions.loaded,
    baseUrl: state.settings.baseUrl,
  };
};

export default connect(mapStateToProps)(StationList);
