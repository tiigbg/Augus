import React from 'react';
import { ScrollView, TouchableHighlight, Text, View } from 'react-native';
import { connect } from 'react-redux';

import * as AT from '../../constants/ActionTypes';
import styles from '../../styles/styles';
import languageCodes from '../../constants/LanguageCodes';
import { findExhibitionListTitle } from '../../util/exhibitionlist.js';

//
class LanguageSelect extends React.Component {
  languages = [];

  //
  constructor(props){
    super(props);
  }

  //
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Välj språk"
    };
  };

  //
  componentWillMount() {
    if(this.props.navigation.state.key == 'Init') {
      //console.log('First view');
      storage.load({
        key: 'language',
        autoSync: false, // if data not found, invoke sync method
        syncInBackground: false // if expired, return old then sync
      }).then(ret => {
        // found data go to then()
        this.props.changeLanguage(ret.language, ret.displaySignlanguage);
        this.props.navigation.navigate('ExhibitionScreen', 
          {title: findExhibitionListTitle(ret.language)} );

          console.log("LanguageSelectthis.componentWillMount - found data");
        
      }).catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
              console.log('language NotFoundError');
              break;
          case 'ExpiredError':
            console.log('language ExpiredError');
              break;
        }
      })
    }
  }

  //
  componentDidMount(){
    storage.load({
      key: 'json',
      autoSync: true, // if data not found, invoke sync method
      syncInBackground: true // if expired, return old then sync
    }).then(ret => { // data found
      const { dispatch } = this.props;
      this.props.loadFromCache(ret);
    }).catch(err => { // handle exceptions, such as data not found
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
            console.log('exhibitionlist NotFoundError');
            this.fetchData();
            break;
        case 'ExpiredError':
          console.log('exhibitionlist ExpiredError');
            this.fetchData();
            break;
      }
    })
  }

  //
  fetchData() {
    this.props.fetchMuseumData(this.props.baseUrl);
  }

  // Render language button for each unique language code found in text data
  render() {
    this.parseLanguages(this.props.texts);

    let languageButtons = [];
    let props = this.props;
    let codeToLanguage = this.codeToLanguage;
    let onLanguagePressed = this.onLanguagePressed;

    this.languages.map(function(languageCode, i){
      // Add language button to array to be rendered
      languageButtons.push(
        <TouchableHighlight
          key={ i }
          onPress={ () => onLanguagePressed(props, languages[i], false) }
          style={ [styles.listContainer, { marginTop: 16 }] }
        >
          <Text style={ [styles.listText] }>
            { codeToLanguage(languages[i]) }
          </Text>
        </TouchableHighlight>
      );
    });
    
    return (
      <View style={ styles.screenContainer }>
      { languageButtons }
      </View>
    );

    /* return(
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
    ); */
  }

  // Given texts with language prop, find unique languages and store in global list
  parseLanguages(texts) {
    if(texts){
      languages = [];
      texts.map(function(text, i){
        if(!languages.includes(text.language)){
          languages.push(text.language);
        }
      });
      this.languages = languages;
    }
  }

  // Given code, returns language name with code TODO: rid of ridiculous naming
  codeToLanguage(languageCode){
    var language = languageCodes.languageCodes.filter(function(language) {
      return language.code == languageCode;
    });
    return language[0].language;
  }

  //
  onLanguagePressed(props, language, isSignLanguage){
    props.changeLanguage(language, isSignLanguage);
    props.navigation.navigate(
      'ExhibitionScreen', 
      {title: findExhibitionListTitle(language)}
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
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
