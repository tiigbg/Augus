import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

import ExhibitionList from '../containers/ExhibitionList';

import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';

//
class ExhibitionScreen extends React.Component {

  //
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title')
    };
  };

  // Render list of exhibitions, language button and reload button
  render() {
    return (
      <View style={ styles.screenContainer }>
        {/* List of exhibitions */}
        <ExhibitionList 
          navigation={this.props.navigation}
        />

        {/* Language select button */}
        <Button
          onPress={() => this.onLanguageChangePressed()}
          title={this.props.language == 'sv' ? 'Byt språk' : 'Change language'}
          color="#e1057d"
        />

        {/* Reload button */}
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

/* Reference to old button
    <View>
      <TouchableHighlight
        onPress={() => { this.props.navigation.navigate('LanguageSelect'); }}>
        <View style={[styles.listContainer, {flexDirection: 'row'}]}>
            <Icon name={'globe'} style={[styles.collapseIcon, {color: 'white'}]} />
            <Text style={styles.listText}>
              { this.props.language=='sv'? 'Change language':'Byt språk'}
            </Text>
          </View>
      </TouchableHighlight>
    </View>
  */