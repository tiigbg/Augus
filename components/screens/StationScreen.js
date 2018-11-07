import React from 'react';
import { ScrollView, ListView, View } from 'react-native';
import { connect } from 'react-redux';

import StationList from '../lists/StationList';

import ImageSelector from '../selectors/ImageSelector';
import AudioSelector from '../selectors/AudioSelector';
import SignLanguageSelector from '../selectors/SignLanguageSelector';
import VideoSelector from '../selectors/VideoSelector';
import MeshSelector from '../selectors/MeshSelector';

import TextViewer from '../viewers/TextViewer';

import * as AT from '../../constants/ActionTypes';
import styles from '../../styles/styles';

//
/* const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID]; */

//
/* let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
}); */

//
class StationScreen extends React.Component {

  //
  constructor(props) {
    super(props);
  }

  //
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title')
    };
  };

  // Render content selectors and list of sub stations
  render() {
    return (
      <View style={ styles.screenContainer }>
        <ScrollView style={ styles.body_container }>
          <View>
            <ImageSelector navigation={ this.props.navigation } />

            <View style={ styles.contentContainer }>
              <AudioSelector navigation={ this.props.navigation } />
              <SignLanguageSelector navigation={ this.props.navigation } />
              <VideoSelector navigation={ this.props.navigation } />
              <MeshSelector navigation={ this.props.navigation } />
              <TextViewer navigation={ this.props.navigation } />
            </View>
          </View>

          <StationList navigation={ this.props.navigation } />
        </ScrollView>
      </View>
    );
  }
}

//
const mapStateToProps = (state) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(StationScreen);