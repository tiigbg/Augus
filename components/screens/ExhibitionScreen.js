import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

import ExhibitionList from '../lists/ExhibitionList';
import ListedButton from '../ListedButton';

import * as AT from '../../constants/ActionTypes';
import styles from '../../styles/styles';
import languageCodes from '../../constants/LanguageCodes';

//
class ExhibitionScreen extends React.Component {

  //
  constructor(props){
    super(props);
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
      <View style={ styles.screenContainer }>
        <ExhibitionList 
          navigation={ this.props.navigation }
        />

        <ListedButton
          onPress={ () => this.onScanPressed() }
          text={ this.codeToLanguage(this.props.language).scanText }
        />

        <ListedButton
          onPress={ () => this.onLanguageChangePressed() }
          text={ this.codeToLanguage(this.props.language).selectText }
        />

        <ListedButton
          onPress={ () => this.onReloadPressed() }
          text={ this.codeToLanguage(this.props.language).reloadText }
        />
      </View>
    );
  }

  // Handle press on language button
  onLanguageChangePressed(){
    this.props.navigation.navigate('LanguageScreen');
  }

  // Handle press on reload button
  onReloadPressed(){
    this.fetchData();
    this.props.navigation.navigate('ExhibitionScreen', { 
      title: this.findExhibitionListTitle(this.props.language) 
    });
  }

  // Handle press on scan button
  onScanPressed(){
    this.props.navigation.navigate('MarkerDetectScreen');
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

  // Given code, returns language name with code TODO: rid of ridiculous naming
  codeToLanguage(languageCode) {
    var language = languageCodes.languageCodes.filter(function (language) {
      return language.code == languageCode;
    });
    return language[0];
  }
}

//
const mapStateToProps = (state) => {
  return {
    //nodes: state.exhibitions.nodes,
    texts: state.exhibitions.texts,
    baseUrl: state.settings.baseUrl,
    language: state.settings.language,
    //triggerImages: state.settings.triggerImages,
    //language: state.settings.language,
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