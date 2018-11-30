import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import RNFetchBlob from 'react-native-fetch-blob';

import { ViroARSceneNavigator, ViroARScene, ViroConstants, ViroMaterials, Viro3DObject, 
  ViroAmbientLight, ViroSpotLight, ViroNode, ViroAnimations } from 'react-viro';

import * as AT from '../../constants/ActionTypes';

// Screen for displaying meshes in AR
// Uses ARMeshScene which is defined below
class ARMeshScreen extends React.Component {

  //
  constructor(props) {
    super(props);

    let hasMesh = false;
    let meshLoaded = false;
    let meshFilename = '';

    let meshFile = this.props.meshes.find((item) => {
       return item.parent_id == this.props.navigation.getParam('nodeID'); 
    });

    if(typeof meshFile !== "undefined") {
      hasMesh = true;

      RNFetchBlob
      .config({
        fileCache : true,
        key: '' + meshFile.id,
        appendExt : 'obj',
      })
      .fetch('GET', this.props.baseUrl + '/meshFile/' + meshFile.id, {
        
      })
      .progress((received, total) => {
        this.setState({ meshLoadProgress: received / total });
      })
      .then((res) => {
        meshFilename = res.path();
        meshFilename = this.props.baseUrl + '/meshFile/' + meshFile.id;
        this.setState({ meshFilename, meshLoaded: true });
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      }); 
    }

    this.state = {
      hasMesh,
      meshLoaded,
      meshFilename
    };
  }

  //
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title')
    };
  };

  //
  render() {
    // The 'viroAppProps={{...this.props}}' line below is used to pass
    // the initial properties from this base component to the ViroSceneNavigator
    // which will allow the scenes to access them.
    let viroAppProps = {...this.props};

    if(this.state.meshFilename || this.state.meshFilename !== ""){
      console.log("ARViewer.meshFilename: ", this.state.meshFilename);

      return (
        <ViroARSceneNavigator
          initialScene={{
            scene: ARMeshScene2,
            passProps:{
              meshFilename: this.state.meshFilename
            }
          }}
          viroAppProps={viroAppProps}
          vrModeEnabled={false}
          apiKey={"7EFF3BA2-A590-4375-9C6E-525728A8D55D"}
        />
      );
    }
    
    return (
      <View></View>
    );
  }
}

//
const mapStateToProps = (state) => {
  return {
    nodes: state.exhibitions.nodes,
    meshes: state.exhibitions.meshes,
    loaded: state.exhibitions.loaded,
    baseUrl: state.settings.baseUrl
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

//
export default connect(mapStateToProps, mapDispatchToProps)(ARMeshScreen);



// Scene displaying a mesh
// Used by ARMeshScreen, defined above
class ARMeshScene2 extends React.Component {

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
            scale={[1, 1, 1]}
            rotation={[0, 180, 0]}
            type="OBJ"
            
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}
            materials={["grid"]}
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
    diffuseTexture: require('../../res/grid_bg.jpg'),
    lightingModel: "Lambert",
    //diffuseTexture: {uri: 'https://file.io/hIFKCf'},
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
