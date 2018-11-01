import React from 'react';

import {StyleSheet} from 'react-native';
import { imageList } from '../util/images';
import { withNavigation } from 'react-navigation';
import * as NavigationService from '../util/NavigationService';

import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

class Detector extends React.Component {
  targets = {}
  markers = []

  //
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    let i = 0;
    for (let target of Object.keys(imageList)) { 
      let ii = i+1;
      console.log("imageList is", imageList);
      console.log("key is", target);
      console.log("require is", imageList[target]);

      this.targets[target] = {
        source: imageList[target],
        orientation: "Up",
        physicalWidth: 0.2
      };
      
      this.markers.push(
        <ViroARImageMarker target={target}
          onAnchorFound={(anchor) => this._onAnchorFound(anchor, target, ii)}
          pauseUpdates={this.state.pauseUpdates} key={target}>
        </ViroARImageMarker>
      );
      i++;
    };

    ViroARTrackingTargets.createTargets(this.targets);
    console.log("Targets", this.targets);
    console.log("Markers", this.markers);

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  //
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {this.markers}
          <Viro3DObject
              source={require('../res/stenbockska_koret_dec2_3_centered.obj')}
              resources={[require('../res/stenbockska_koret_dec2_3_centered.mtl')]}
              position={[0, -1, -1]}
              scale={[0.2, 0.2, 0.2]}
              rotation={[0, 180, 0]}
              type="OBJ" />
        <ViroAmbientLight color={"#9999aa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,0]}
          position={[0, 3, 0]} color="#ffffff" castsShadow={true} />
        <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
        </ViroNode>
      </ViroARScene>
    );
  }
  
  //
  _onAnchorFound(stuff1, stuff2, i) {
    console.log("We found anchor", stuff1, stuff2, i, this.props);
    const node = 
      this.props.arSceneNavigator.viroAppProps.navigation.state.params.nodes[i];
    console.log("Node is", node);
    NavigationService.navigate('StationList', {node, title:""});
  }

  //
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

class ARDetector extends React.Component {
  render() {
    // The 'viroAppProps={{...this.props}}' line below is used to pass
    // the initial properties from this base component to the ViroSceneNavigator
    // which will allow the scenes to access them.
    let viroAppProps = {...this.props};
    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: Detector,
        }}
        viroAppProps={viroAppProps}
        vrModeEnabled={false}
        apiKey={"7EFF3BA2-A590-4375-9C6E-525728A8D55D"}
      />
    );
  }
}
export default withNavigation(ARDetector);
