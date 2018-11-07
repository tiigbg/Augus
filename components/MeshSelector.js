import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, View, Platform, 
  Button } from 'react-native';
import { connect } from 'react-redux';

import RNFetchBlob from 'react-native-fetch-blob'

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
class MeshSelector extends React.Component {

  //
  constructor(props) {
    super(props);

    let hasMesh = false;
    let meshLoaded = false;
    let meshFilename = '';
    let meshFile = this.props.meshes.find((item) => {
      return item.parent_id == this.props.navigation.state.params.node.id; 
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
  render(){
    if(!this.state.hasMesh) {
      return(<View></View>);
    }

    if(this.state.meshLoaded) {
      return(
        <View>
          <View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style = {{ flex: 1, flexDirection: 'column' }}>
              <Button
                onPress={() => this.onMeshSelected()}
                title={this.props.language == 'sv' ? 'Titta på modell' : 'Look at model'}
                color="#e1057d"
              />
            </View>
          </View>

          <View style = { styles.separator } />
        </View>
      );
    } else {        
      if (Platform.OS === 'android') {
        return(
          <ProgressBarAndroid 
            progress = { this.state.meshLoadProgress }
            styleAttr = 'Horizontal'>
          </ProgressBarAndroid>
        );
      } else {
        return(
          <ProgressViewIOS 
            progress = { this.state.meshLoadProgress }
            progressViewStyle = 'bar'>
          </ProgressViewIOS>
        );
      }
    }
  }

  // Handle press on mesh button
  onMeshSelected(){
    this.props.navigation.navigate('ARViewer', {
      nodeID: this.props.navigation.state.params.node.id
    });
  }
}

//
const mapStateToProps = (state) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(MeshSelector);