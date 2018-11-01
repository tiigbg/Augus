import React from 'react';

import {StyleSheet} from 'react-native';
import { imageList } from '../util/images';

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

class Viewer extends React.Component {
  targets = {}
  markers = []

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }


  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText 
          text={this.state.text} 
          scale={[.5, .5, .5]} 
          position={[0, 0, -1]} 
          style={styles.helloWorldTextStyle} 
        />

        <Viro3DObject
          source={require('../res/stenbockska_koret_dec2_3_centered.obj')}
          position={[0, -1, -1]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[0, 180, 0]}
          type="OBJ" 
        />

        <ViroAmbientLight color={"#aaaaaa"} />

        <ViroSpotLight 
          innerAngle={5} 
          outerAngle={90} 
          direction={[0,-1,-.2]}
          position={[0, 3, 1]} 
          color="#ffffff" 
          castsShadow={true} 
        />
        
        <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
        </ViroNode>
      </ViroARScene>
    );
  }

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

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

export default class ARViewer extends React.Component {
  render() {
    // The 'viroAppProps={{...this.props}}' line below is used to pass
    // the initial properties from this base component to the ViroSceneNavigator
    // which will allow the scenes to access them.
    let viroAppProps = {...this.props};
    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: Viewer,
        }}
        viroAppProps={viroAppProps}
        vrModeEnabled={false}
        apiKey={"7EFF3BA2-A590-4375-9C6E-525728A8D55D"}
      />
    );
  }
}
