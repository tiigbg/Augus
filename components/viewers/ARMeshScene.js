import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import RNFetchBlob from 'react-native-fetch-blob'
import { StyleSheet } from 'react-native';

import { ViroARSceneNavigator, ViroARScene, ViroConstants, ViroMaterials, Viro3DObject, 
  ViroAmbientLight, ViroSpotLight, ViroNode, ViroAnimations } from 'react-viro';

import * as AT from '../constants/ActionTypes';

//
class ARMeshScene extends React.Component {
 
  //
  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  //source={require('../res/stenbockska_koret_dec2_3_centered.obj')}
  //source={require(this.props.meshFilename)}
  //
  render() {
    if(this.props.meshFilename !== ""){
      return (
        <ViroARScene onTrackingUpdated={ this._onInitialized }>
          <Viro3DObject
            source={{uri:this.props.meshFilename}}
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

    return (
      <View></View>
    );
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

//
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

//
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../res/grid_bg.jpg'),
  },
});

//
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

//
export default connect(ARMeshScene);