import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, ScrollView, Image, ListView, TouchableHighlight, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { findColor, findSymbol, findNode, findText, findChildren } from '../util/station.js';
import NavBar from '../components/NavBar';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from '../components/VideoPlayer';
import ImageCaption from '../components/ImageCaption';
import StationText from '../components/StationText';
import Dimensions from 'Dimensions';
import Lightbox from 'react-native-lightbox';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/FontAwesome';
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


const StationList = React.createClass({
  getInitialState() {
    //console.log('StationList getInitialState props:');
    //console.log(this.props);
    const nodes = this.props.nodes;
    // const exhibition = nodes[this.props.node.id];
    const exhibition = findNode(this.props.navigation.state.params.node.id, nodes);
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    sectionIDs.push(`0`);
    rowIDs[`0`] = [];
    for (const id in nodes){
      // don't confuse museum sections and list sections here
      const node = nodes[id];
      //console.log('going through nodes (id='+id+')');
      if (node.parent_id === exhibition.id) {
        //console.log('Found child node with id='+node.id);
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
    
    collapseText = (rowIDs[0].length > 0);
    
    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);

    let hasAudio = false;
    let audioLoaded = false;
    let audioFilename = '';
    let audioFile = this.props.audio.find((item)=>{ return item.parent_id == this.props.navigation.state.params.node.id && item.parent_type=='section' && item.language==this.props.language; });
    if (typeof audioFile !== "undefined") {
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

    let hasSignlanguage = false;
    let signlanguageLoaded = false;
    let signlanguageFilename = '';
    let signlanguageFile = this.props.signlanguages.find((item)=>{ return item.parent_id == this.props.navigation.state.params.node.id && item.language==this.props.language; });
    if (typeof signlanguageFile !== "undefined" && this.props.displaySignlanguage) {
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

    let hasVideo = false;
    let videoLoaded = false;
    let videoFilename = '';
    let videoFile = this.props.video.find((item)=>{ return item.parent_id == this.props.navigation.state.params.node.id && item.language==this.props.language; });
    if (typeof videoFile !== "undefined") {
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
    return {
      myDataSource,
      collapseText,
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
    //console.log('stationList renderRow '+sectionID+':'+rowID);
    //console.log(rowData);
    const station = this.props.nodes[rowID];
    let title = findText(station, this.props.texts, 'section', 'title', this.props.language).text;
    let openFunction = () => { this.props.navigation.navigate('StationList', { node: station, title }); };
    if (station.type === 'leaf') {
      console.log("Oh no, don't go here!!");
      openFunction = () => { this.props.navigation.navigate('StationScreen', { station, title, nodes: this.props.nodes }); };
    }
    const symbol = findSymbol(station, this.props.nodes, this.props.icons);
    let symbolView = (<View />);
    if (symbol !== '') {
      symbolView = (
        <Image
          source={{ uri: this.props.baseUrl+'/iconFile/'+symbol.id }}
          style={styles.stationSymbol}
        />);
    }
    const backgroundColor = findColor(station, this.props.nodes, false);
    const borderColor = findColor(station, this.props.nodes, true);
    return (
      <View>
        <TouchableHighlight
          onPress={openFunction}
        >
          <View style={[styles.listContainer, { backgroundColor, borderColor, borderWidth: 3 }]}>
            <View style={styles.rightContainer}>
              {symbolView}
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
    return (<View></View>);
  },
  render() {
    // if (this.props.dataSource == null) {
    //   console.log('Datasource null');
    //   return (
    //     <Text>loading</Text>
    //     );
    // }
    const station = this.props.navigation.state.params.node;
    const nodes = this.props.nodes;
    const backgroundColor = findColor(station, this.props.nodes, true);
    function findPrevious(node) {
      return node && node.parent_id === station.parent_id && node.order === station.order - 1;
    }
    function findNext(node) {
      return node && node.parent_id === station.parent_id && node.order === station.order + 1;
    }
    const prevStation = nodes.find(findPrevious);
    const nextStation = nodes.find(findNext);
    
    let navbar = (
      <NavBar
        title={this.props.navigation.state.params.title}
        previous={prevStation}
        next={nextStation}
        node={this.props.navigation.state.params.node}
        nodes={this.props.nodes}
        texts={this.props.texts}
        language={this.props.language}
      />);
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
    let images = findChildren(this.props.navigation.state.params.node, this.props.images);
    if(images.length > 0) {
      imageView = (
        <ScrollView horizontal
          style={styles.imageGallery}
        >
        {
          images.map((eachImage, i) => {
            const imageboxwidth = Dimensions.get('window').width/5*4;
            const imageDescription = findText(eachImage, this.props.texts, 'image', 'body', this.props.language).text;
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
                  // <Text style={{ color: '#fff', marginTop: -100, fontSize: 28 }}>{imageDescription}</Text>
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
                    <ImageCaption texts={this.props.texts} image={eachImage} baseUrl={this.props.baseUrl} audio={this.props.audio} node={this.props.navigation.state.params.node} language={this.props.language}/>
                  </View>
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
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <AudioPlayer file={ this.state.audioFilename } nodeId={this.props.navigation.state.params.node.id} />
              </View>
            </View>
            <View style={styles.separator} />
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
    if(this.state.hasSignlanguage && this.props.displaySignlanguage) {
      if(this.state.signlanguageLoaded) {
        signlanguageView = (
          <View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <VideoPlayer file={ this.state.signlanguageFilename } showSignlanguageIcon={ true } />
              </View>
            </View>
            <View style={styles.separator} />
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
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <VideoPlayer file={ this.state.videoFilename } />
              </View>
            </View>
            <View style={styles.separator} />
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
    let description = findText(this.props.navigation.state.params.node, this.props.texts, 'section', 'body', this.props.language);
    if ('parent_id' in description)
    {
      textView = (
        <View>
          <StationText
            texts={this.props.texts}
            node={this.props.navigation.state.params.node}
            language={this.props.language}
            collapse={this.state.collapseText} />
          <View style={styles.separator} />
        </View>
      );
    }


    let stationView = (
      <View>
      <View >
        {imageView}
      </View>
      <View style={styles.contentContainer}>
        {audioPlayerView}
        {signlanguageView}
        {videoPlayerView}
        {textView}
      </View>
      </View>
    );
    return (
      <View style={styles.screenContainer}>
        <View style={ styles.navbar_container }>{navbar}</View>
        <ScrollView style={ styles.body_container }>
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
  //console.log('StationList mapStateToProps state:');
  //console.log(state);
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
    displaySignlanguage: state.settings.displaySignlanguage,
  };
};

export default connect(mapStateToProps)(StationList);
