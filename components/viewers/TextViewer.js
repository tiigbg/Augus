import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import StationText from './StationText';

import { findText, findNode } from '../util/station.js';

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
class TextViewer extends React.Component {

  //
  constructor(props) {
    super(props);

    const nodes = this.props.nodes;
    const exhibition = findNode(this.props.navigation.state.params.node.id, nodes);

    const rowIDs = [];
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
        //dataBlob[`0:${id}`] = `0:${id}`;
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

    collapseText = (rowIDs[0].length > 0);

    this.state = {
      collapseText
    };
  }
  
  //
  render(){
    let textView = (
      <Text></Text>
    );

    // Section text
    let description = findText(
      this.props.navigation.state.params.node,
      this.props.texts, 'section', 'body', this.props.language);
      
    if ('parent_id' in description) {
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

    return textView;
  }
}

//
const mapStateToProps = (state) => {
  return {
    nodes: state.exhibitions.nodes,
    texts: state.exhibitions.texts,
    language: state.settings.language
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

export default connect(mapStateToProps, mapDispatchToProps)(TextViewer);