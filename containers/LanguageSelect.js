import React from 'react';
import { ProgressBarAndroid, ProgressViewIOS, ScrollView, Image, ListView, TouchableHighlight, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as AT from '../constants/ActionTypes';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob'


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
                Actions.exhibitionList({ title: 'Utställningar' });
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
                Actions.exhibitionList({ title: 'Utställningar' });
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
                Actions.exhibitionList({ title: 'Exhibitions' });
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
