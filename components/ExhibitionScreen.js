import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import ExhibitionList from '../containers/ExhibitionList';

import * as AT from '../constants/ActionTypes';

//
class ExhibitionScreen extends React.Component {
  //
  constructor(props) {
    super(props);
    this.onExhibitionPressed = this.onExhibitionPressed.bind(this);
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
      <View>
        <ExhibitionList 
          navigation={this.navigation}
          onExhibitionPressed={this.onExhibitionPressed}
        />

        <Button
          onPress={() => this.onLanguageChangePressed()}
          title={this.props.language == 'sv' ? 'Byt språk' : 'Change language'}
          color="#e1057d"
        />

        <Button
          onPress={() => this.onReloadPressed()}
          title={this.props.language == 'sv' ? 'Ladda om' : 'Reload' }
          color="#e1057d"
        />
      </View>
    );
  }

  // Handle press on language button
  onLanguageChangePressed(){
    this.props.navigation.navigate('LanguageSelect');
  }

  // Handle press on reload button
  onReloadPressed(){
    this.fetchData();
    this.props.navigation.navigate('ExhibitionScreen',
      { title: this.findExhibitionListTitle(this.props.language) });
  }

  //
  onExhibitionPressed(node, title) {
    this.props.navigation.navigate('StationList', { node: node, title });
  }

  //
  fetchData() {
    this.props.fetchMuseumData(this.props.baseUrl);
  }

  //
  findExhibitionListTitle(language = 'sv') {
    switch (language) {
      case 'sv':
        return 'Start';
      case 'en':
        return 'Start';
    }
    return 'Start';
  }
}

const mapStateToProps = (state) => {
  return {
    // exhibitions: state.exhibitions.exhibitions,
    // sections: state.exhibitions.sections,
    // stations: state.exhibitions.stations,
    nodes: state.exhibitions.nodes,
    texts: state.exhibitions.texts,
    images: state.exhibitions.images,
    icons: state.exhibitions.icons,
    audio: state.exhibitions.audio,
    video: state.exhibitions.video,
    signlanguages: state.exhibitions.signlanguages,
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
      dispatch({ type: AT.MUSEUM_DATA_FETCH_REQUESTED, payload: 
        { REQUEST_URL: baseUrl + '/alldata' } });
    },
    loadFromCache: (data) => {
      dispatch({ type: AT.MUSEUM_DATA_LOADED_FROM_CACHE, data });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExhibitionScreen);