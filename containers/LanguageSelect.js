import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, ScrollView, Image, ListView, TouchableHighlight, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob'
import { findExhibitionListTitle } from '../util/exhibitionlist.js';



const LanguageSelect = React.createClass({
  getInitialState() {
    return {
    };
  },
 
  render() {
   
    return (
      <View style={styles.screenContainer}>
        <ScrollView >
          <TouchableHighlight
              onPress={() => {
                this.props.changeLanguage('sv', false);
                this.props.navigation.navigate('ExhibitionList', {title: findExhibitionListTitle('sv')} );
              }}
              style={[styles.listContainer, { marginTop: 16 }]}
            >
              <Text style={[styles.listText]}>
                Svenska
              </Text>
          </TouchableHighlight>
          <TouchableHighlight
              onPress={() => {
                this.props.changeLanguage('sv', true);
                this.props.navigation.navigate('ExhibitionList', {title: findExhibitionListTitle('sv')} );
              }}
              style={styles.listContainer}
            >
              <Text style={[styles.listText]}>
                Svensk teckenspråk
              </Text>
          </TouchableHighlight>
          <TouchableHighlight
              onPress={() => {
                this.props.changeLanguage('en', false);
                this.props.navigation.navigate('ExhibitionList', {title: findExhibitionListTitle('en')} );
              }}
              style={styles.listContainer}
            >
              <Text style={[styles.listText]}>
                English
              </Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  },
});

const mapStateToProps = (state) => {
  return {
    loaded: state.exhibitions.loaded,
    baseUrl: state.settings.baseUrl,
    language: state.settings.language,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeLanguage: (language, displaySignlanguage) => {
      dispatch({ type: AT.CHANGE_LANGUAGE, language, displaySignlanguage });
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
