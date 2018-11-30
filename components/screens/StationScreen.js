import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';

import StationList from '../lists/StationList';

import ImageSelector from '../selectors/ImageSelector';
import AudioSelector from '../selectors/AudioSelector';
import SignLanguageSelector from '../selectors/SignLanguageSelector';
import VideoSelector from '../selectors/VideoSelector';
import MeshSelector from '../selectors/MeshSelector';

import TextViewer from '../viewers/TextViewer';
import { findText } from '../../util/station.js';

import * as AT from '../../constants/ActionTypes';
import styles from '../../styles/styles';

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
    let title = findText(
      this.props.navigation.state.params.node, 
      this.props.texts, 'section', 'title', this.props.language);

    return (
      <View style={ styles.screenContainer }>
        <ScrollView style={ styles.scrollListContainer }>
          <View>
            <ImageSelector navigation={ this.props.navigation } />
            <Text style={ styles.title }>{ title.text }</Text>

            <View style= { styles.stationContentContainer }>
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

//
export default connect(mapStateToProps, mapDispatchToProps)(StationScreen);