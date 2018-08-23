import React from 'react';
import { ScrollView, Image, ListView, TouchableHighlight, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import { findText, findChildren } from '../util/station.js';
import { findExhibitionListTitle } from '../util/exhibitionlist.js';
import styles from '../styles/styles';
import * as AT from '../constants/ActionTypes';
// import { StationList } from 'StationList';
import Storage from 'react-native-storage';
import { goBack, previous, next } from '../util/header'
import { Platform, AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import Icon from 'react-native-vector-icons/FontAwesome';


const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

global.storage = new Storage({
    // maximum capacity, default 1000 
    size: 10000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync : {
      
      // The name of the sync method must be the same of the data's key
      // And the passed params will be an all-in-one object.
      // You can use promise here. 
      // Or plain callback function with resolve/reject, like:
      image(params){
        let { id, resolve, reject } = params;
        fetch(this.props.baseUrl+'/imageFile/'+id, {
            method: 'GET',
            body: 'id=' + id
        }).then(response => {
            console.log('response image:');
            console.log(response);
            return response.json();
        }).then(json => {
          // console.log(json);
          if(json && json.user){
            storage.save({
                key: 'user',
                id,
                data: json.user
            });
            // Call resolve() when succeed
            resolve && resolve(json.user);
          }
          else{
            // Call reject() when failed
            reject && reject(new Error('data parse error'));
          }
        }).catch(err => {
          console.warn(err);
          reject && reject(err);
        });
      }
    }
});

/*storage.remove({
    key: 'json'
});
*/

class ExhibitionList extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title')   
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ 
      title: this.props.title,
      parent_id: this.props.navigation.state.params.node.parent_id,
      nodes: this.props.nodes,
      language: this.props.language,
      texts: this.props.texts,
    });
  }
  componentDidMount() {
    storage.load({
      key: 'json',

      // autoSync(default true) means if data not found or expired,
      // then invoke the corresponding sync method
      autoSync: true,

      // syncInBackground(default true) means if data expired,
      // return the outdated data first while invoke the sync method.
      // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
      syncInBackground: true
    }).then(ret => {
      // found data go to then()
      const { dispatch } = this.props;
      this.props.loadFromCache(ret);

      
    }).catch(err => {
      // any exception including data not found 
      // goes to catch()
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
  componentWillUpdate(nextProps, nextState) {
    //console.log('exhibitionlist componentWillUpdate', nextProps);
    const nodes = nextProps.nodes;
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    let iExh = 0;
    for (const i in nodes) {
      const node = nodes[i];
      // console.log('reading node');
      if (node.parent_id == null) {
        // console.log('found exhibition');
        // console.log('exhibition');
        // console.log(node);
        sectionIDs.push(`${iExh}`);
        dataBlob[`${iExh}`] = i;
        rowIDs[`${iExh}`] = [];
        iExh++;
      }
    }
    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  }
  fetchData() {
    console.log('exhibitionlist fetchData()' +this.props.baseUrl+'/alldata');
    this.props.fetchMuseumData(this.props.baseUrl);
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading... 
        </Text>
        <View>
          <TouchableHighlight
              onPress={() => { this.fetchData(); }}
              style={{ margin: 5 }}
            >
              <Text>
                Retry
              </Text>
          </TouchableHighlight>
          </View>
      </View>
    );
  }
  renderRow(rowData, sectionID, rowID) {
    return (
      <Text>
        {rowData}
      </Text>
    );
  }
  renderSectionHeader(sectionData, sectionID) {
    // console.log('renderSectionHeader');
    // console.log('sectionData');
    // console.log(sectionData);
    const exhibition = this.props.nodes[sectionData];
    if(exhibition.hasOwnProperty('visibility') && exhibition.visibility == 'hidden')
      return (<View/>);
    let title = findText(exhibition, this.props.texts, 'section', 'title', this.props.language).text;
    let images = findChildren(exhibition, this.props.images);
    let exhibitionImageTag = (<View/>);
    if(images.length > 0) {
      exhibitionImage = images[0];
      exhibitionImageTag = (
        <Image
          source={{ uri: this.props.baseUrl+'/imageFile/'+exhibitionImage.id }}
          style={styles.exhibitionImage}
        />
      );
    }
    return (
      <View>
        <TouchableHighlight
      onPress={() => this.props.navigation.navigate('StationList', { node: exhibition, title })}
        >
          <View>
            <View style={styles.listContainer}>
              { exhibitionImageTag }
              <Text style={styles.listText}>{title}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  renderListView() {
    return (
      <View>
        <ListView
          style={styles.listMargin}
          dataSource={myDataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
          enableEmptySections
        />
        <View>
          <TouchableHighlight
            onPress={() => { this.props.navigation.navigate('LanguageSelect'); }}>
            <View style={[styles.listContainer, {flexDirection: 'row'}]}>
                <Icon name={'globe'} style={[styles.collapseIcon, {color: 'white'}]} />
                <Text style={styles.listText}>{ this.props.language=='sv'? 'Change language':'Byt språk'}</Text>
              </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            onPress={() => { this.fetchData(); this.props.navigation.navigate('ExhibitionList', {title: findExhibitionListTitle(this.props.language)}); }}>
            <View style={[styles.listContainer, {flexDirection: 'row'}]}>
                <Icon name={'refresh'} style={[styles.collapseIcon, {color: 'white'}]} />
                <Text style={styles.listText}>{ this.props.language=='sv'? 'Ladda om':'Reload'}</Text>
              </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  render() {
    if (!this.props.loaded) {
      let loadingView = this.renderLoadingView();
      return (
        <View style={styles.screenContainer}>
          {loadingView}
        </View>
      );
    }
    let listView = this.renderListView();
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={ styles.body_container } contentContainerStyle={styles.contentContainer}>
          {listView}
        </ScrollView>
      </View>
    );
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
    displaySignlanguage: state.settings.displaySignlanguage,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMuseumData: (baseUrl) => {
      console.log("Time to fetch from", baseUrl);
      dispatch({ type: AT.MUSEUM_DATA_FETCH_REQUESTED, payload: { REQUEST_URL: baseUrl +'/alldata' } });
    },
    loadFromCache: (data) => {
      dispatch({ type: AT.MUSEUM_DATA_LOADED_FROM_CACHE, data });
    }
  }
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, mapDispatchToProps)(ExhibitionList);
