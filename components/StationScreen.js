import React from 'react';
import { ScrollView, ListView, View } from 'react-native';
import { connect } from 'react-redux';

import StationList from '../containers/StationList';
import ImageViewer from './ImageViewer';
import AudioViewer from './AudioViewer';
import SignLanguageViewer from './SignLanguageViewer';
import VideoViewer from './VideoViewer';
import TextViewer from './TextViewer';
import MeshViewer from './MeshViewer';

import { findColor, findNode } from '../util/station.js';

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];

//
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

//
class StationScreen extends React.Component {

  //
  constructor(props) {
    super(props);
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
      } else {
        //console.log("Parent ID is instead ", node.parent_id, exhibition.id);
      }
    }

    //console.log("datablob is", dataBlob);
    
    collapseText = (rowIDs[0].length > 0);
    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);

    this.state = {
      myDataSource,
      collapseText,
    };
  }

  //
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title')
    };
  };

  // Render list of exhibitions, language button and reload button
  render() {
    return (
      <View style={ styles.screenContainer }>
        <ScrollView style={ styles.body_container }>
          <View>
            <ImageViewer navigation={ this.props.navigation } />

            <View style={ styles.contentContainer }>
              <AudioViewer navigation={ this.props.navigation } />
              <SignLanguageViewer navigation={ this.props.navigation } />
              <VideoViewer navigation={ this.props.navigation } />
              <MeshViewer navigation={ this.props.navigation } />
              <TextViewer navigation={ this.props.navigation } />
            </View>
          </View>

          <StationList navigation={ this.props.navigation } />
        </ScrollView>
      </View>
    );
  }

  //TODO
  // Handle press on language button
  onLanguageChangePressed(){
    this.props.navigation.navigate('LanguageSelect');
  }

  //TODO
  // Handle press on reload button
  onReloadPressed(){
    this.fetchData();
    /*this.props.navigation.navigate('ExhibitionScreen',
      { title: this.findExhibitionListTitle(this.props.language) });*/
  }

  //
  /*fetchData() {
    this.props.fetchMuseumData(this.props.baseUrl);
  }*/
}

const mapStateToProps = (state) => {
    return {
      nodes: state.exhibitions.nodes,
      texts: state.exhibitions.texts,
      images: state.exhibitions.images,
      icons: state.exhibitions.icons,
      audio: state.exhibitions.audio,
      video: state.exhibitions.video,
      signlanguages: state.exhibitions.signlanguages,
      /* meshes: state.exhibitions.meshes,
      triggerimages: state.exhibitions.triggerimages, */
      loaded: state.exhibitions.loaded,
      baseUrl: state.settings.baseUrl,
      language: state.settings.language,
      displaySignlanguage: state.settings.displaySignlanguage
    };
  };
  
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(StationScreen);