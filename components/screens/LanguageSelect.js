import React from 'react';
import { ScrollView, TouchableHighlight, Text, View } from 'react-native';
import { connect } from 'react-redux';

import * as AT from '../../constants/ActionTypes';
import styles from '../../styles/styles';

import { findExhibitionListTitle } from '../../util/exhibitionlist.js';

//
class LanguageSelect extends React.Component {

  //
  constructor(props){
    super(props);

    /* console.log("texts", this.props.texts); */
  }

  //
  componentWillMount() {
    /* console.log("texts", this.props.texts); */

    //console.log(this.props.navigation.state.key);
    if(this.props.navigation.state.key == 'Init') {
      //console.log('First view');
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
        this.props.navigation.navigate('ExhibitionScreen', 
          {title: findExhibitionListTitle(ret.language)} );
        
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
  }

  //TODO: Data dependent language selection rather than hard coded
  render() {
    /* console.log("texts", this.props.texts); */

    return (
      <View style={styles.screenContainer}>
        <ScrollView>
          <TouchableHighlight
            onPress={() => {
              this.props.changeLanguage('sv', false);
              this.props.navigation.navigate('ExhibitionScreen', 
                {title: findExhibitionListTitle('sv')} );
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
              this.props.navigation.navigate('ExhibitionScreen', 
                {title: findExhibitionListTitle('sv')} );
            }}
            style={styles.listContainer}
          >
            <Text style={[styles.listText]}>
              Svenskt teckenspråk
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              this.props.changeLanguage('en', false);
              this.props.navigation.navigate('ExhibitionScreen', 
                {title: findExhibitionListTitle('en')} );
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
  }
}

//
const mapStateToProps = (state) => {
  return {
    loaded: state.exhibitions.loaded,
    baseUrl: state.settings.baseUrl,
    language: state.settings.language,
    texts: state.exhibitions.texts,
  };
};

//
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeLanguage: (language, displaySignlanguage) => {
      dispatch({ type: AT.CHANGE_LANGUAGE, language, displaySignlanguage });
    },
  }
};

//
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
