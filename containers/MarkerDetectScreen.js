import React from 'react';
import { connect } from 'react-redux';

import { findText, findNodeIndex } from '../util/station.js';

import { ViroARScene, ViroARSceneNavigator, ViroConstants, ViroARTrackingTargets,
  ViroARImageMarker } from 'react-viro';

// Marker detection screen
class MarkerDetectScreen extends React.Component {
  
  //
  constructor(props) {
    super(props);
  }
  
  //
  render() {
    let viroAppProps = {...this.props};
    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: MarkerDetectScene,
          passProps:{
            navigation: this.props.navigation,
            triggerMarkers: this.props.triggerMarkers,
            baseUrl: this.props.baseUrl,
            nodes: this.props.nodes,
            texts: this.props.texts,
            language: this.props.language
          }
        }}
        viroAppProps = { viroAppProps } // pass initial props
        vrModeEnabled = { false }
        apiKey = { "7EFF3BA2-A590-4375-9C6E-525728A8D55D" }
      />
    );
  }
}
  
//
const mapStateToProps = (state) => {
  return {
    nodes: state.exhibitions.nodes,
    texts: state.exhibitions.texts,
    triggerMarkers: state.exhibitions.triggerMarkers,
    loaded: state.exhibitions.loaded,
    baseUrl: state.settings.baseUrl,
    language: state.settings.language,
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

export default connect(mapStateToProps, mapDispatchToProps)(MarkerDetectScreen);

// Marker detection scene, presented through marker detection screen
class MarkerDetectScene extends React.Component {
  targets = {}
  markers = []

  //
  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // For each marker, create trigger from marker to its parent station
    let i = 0;
    for(let marker of this.props.triggerMarkers){
      let ii = i + 1;
      let markerKey = "" + marker.id; // Create unique string key
      let fileSource = { uri:this.props.baseUrl + "/triggerMarkerFile/" + marker.id };

      // Add to array of targets to be fed to Viro later
      this.targets[markerKey] = {
        source: fileSource,
        orientation: "Up",
        physicalWidth: 0.2
      };

      // Add Viro component to array of markers
      this.markers.push(
        <ViroARImageMarker
          key = { ii }
          target = { markerKey }
          pauseUpdates = { false }
          onAnchorFound = { 
            (anchor) => this.onAnchorFound(anchor, marker.parent_id, ii) }
          onAnchorRemoved = { 
            (anchor) => this.onAnchorRemoved(anchor, marker.parent_id, ii)}
        >
        </ViroARImageMarker>
      );
      i++;
    }
    // Feed Viro with array of targets
    ViroARTrackingTargets.createTargets(this.targets);

    // Bind 'this' to functions
    this.onInitialized = this.onInitialized.bind(this);
  }

  // Render array of Viro marker components to Viro scene
  render() {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized} >
        {this.markers}
      </ViroARScene>
    );
  }
  
  //
  onAnchorFound(anchor, nodeID, i) {
    const station = this.props.nodes[findNodeIndex(nodeID, this.props.nodes)];
    let title = findText(
      station, this.props.texts, 'section', 'title', this.props.language).text;

    this.onStationPressed(station, title);
  }

  //
  onAnchorRemoved(anchor, nodeID, i){
    console.log("MarkerDetectScene.onAnchorRemoved: " + nodeID);
  }

  // Handle on station selected
  onStationPressed(station, title){
    if (station.type === 'leaf') {
      // If sub station
      this.props.navigation.navigate('StationScreen', 
        { station, title, nodes: this.props.nodes });
    } else {
      // If root station
      this.props.navigation.push('StationScreen', 
        { node: station, title });
    }
  }

  //
  onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}
