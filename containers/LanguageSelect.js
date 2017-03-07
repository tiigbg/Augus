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
  componentWillMount()
  {
    console.log(this.props.navigation.state.key);
    if(this.props.navigation.state.key == 'Init')
    {
      console.log('First view');
      storage.load({
        key: 'language',

        // autoSync(default true) means if data not found or expired,
        // then invoke the corresponding sync method
        autoSync: false,

        // syncInBackground(default true) means if data expired,
        // return the outdated data first while invoke the sync method.
        // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
        syncInBackground: false
      }).then(ret => {
        // found data go to then()
        this.props.changeLanguage(ret.language, ret.displaySignlanguage);
        this.props.navigation.navigate('ExhibitionList', {title: findExhibitionListTitle(ret.language)} );
        
      }).catch(err => {
        switch (err.name) {
          case 'NotFoundError':
              console.log('language NotFoundError');
              break;
          case 'ExpiredError':
            console.log('language ExpiredError');
              break;
        console.warn(err.message);
        }
      })
    }
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
