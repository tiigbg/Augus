import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

import ExhibitionList from '../lists/ExhibitionList';

import * as AT from '../../constants/ActionTypes';
import styles from '../../styles/styles';

//
class ExhibitionScreen extends React.Component {

  //
  constructor(props){
    console.log("ExhibitionScreen");

    super(props);
  }

  //
  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    return {
      headerTitle: navigation.getParam('title')
    };
  };

  // Render list of exhibitions, language button and reload button
  render() {
    return (
      <View style={ styles.screenContainer }>
        <ExhibitionList 
          navigation={this.props.navigation}
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

        <Button
          onPress={() => this.onScanPressed()}
          title={this.props.language == 'sv' ? 'Scanna' : 'Scan' }
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
    this.props.navigation.navigate('ExhibitionScreen', { 
      title: this.findExhibitionListTitle(this.props.language) 
    });
  }

  // Handle press on scan button
  onScanPressed(){
    this.props.navigation.navigate('MarkerDetectScreen', {
      //triggerImages: this.props.triggerImages,
      //nodes: this.props.nodes,
    });
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

//
const mapStateToProps = (state) => {
  return {
    //nodes: state.exhibitions.nodes,
    //texts: state.exhibitions.texts,
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