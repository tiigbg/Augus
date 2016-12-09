import React from 'react';
import { ScrollView, Image, ListView, TouchableHighlight, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { findText } from '../util/station.js';
import NavBar from '../components/NavBar';
import styles from '../styles/styles';
import * as AT from '../constants/ActionTypes';
// import { StationList } from 'StationList';
import Storage from 'react-native-storage';
import { Platform, AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

//const REQUEST_URL = 'https://gist.githubusercontent.com/Jickelsen/13c93e3797ee390cb772/raw/2def314de7cd6c3a44c31095d7298d46e6cdf061/adventures.json';
// const REQUEST_URL = 'https://gist.githubusercontent.com/nielsswinkels/cd70fffbde91a72df3a61defedc231d3/raw/d97b662e9b47063a8ba8d614e1f6776643db30eb/goteborgsstadsmuseum.json';
//let REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum2-symbols2.json';
// let REQUEST_URL = 'http://192.168.1.122:8000/alldata';
let REQUEST_URL = 'http://192.168.2.95:8000/alldata';
// const REQUEST_URL = 'http://www.tiigbg.se/augus/tiny.json';

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
    size: 1000,

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
      // we'll talk about the details later.
      user(params){
      let { id, resolve, reject } = params;
        fetch('user/', {
            method: 'GET',
            body: 'id=' + id
        }).then(response => {
            return response.json();
        }).then(json => {
          // console.log(json);
          if(json && json.user){
            storage.save({
                key: 'user',
                id,
                rawData: json.user
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
})  


const ExhibitionList = React.createClass({
  getInitialState() {
    return {
      loaded: false,
      fetchedImage: (<View><Text>Failed to load image</Text></View>),
    };
  },
  componentDidMount() {
    this.fetchData();

    global.storage.save({
      key: 'loginState',   // Note: Do not use underscore("_") in key!
      rawData: { 
          from: 'some other site',
          userid: 'some userid',
          token: 'some token'
      },

      // if not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600
    });

    storage.load({
      key: 'loginState',

      // autoSync(default true) means if data not found or expired,
      // then invoke the corresponding sync method
      autoSync: true,

      // syncInBackground(default true) means if data expired,
      // return the outdated data first while invoke the sync method.
      // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
      syncInBackground: true
    }).then(ret => {
      // found data go to then()
      console.log(ret.userid);
    }).catch(err => {
      // any exception including data not found 
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
          case 'NotFoundError':
              // TODO;
              break;
          case 'ExpiredError':
              // TODO
              break;
      }
    })

  },
  componentWillUpdate(nextProps, nextState) {
    console.log('exhibitionlist componentWillUpdate');
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
  },
  fetchData() {
    const { dispatch } = this.props;
    dispatch({ type: AT.MUSEUM_DATA_FETCH_REQUESTED, payload: { REQUEST_URL } });

    RNFetchBlob
      .config({
        fileCache : true,
        // by adding this option, the temp files will have a file extension
        appendExt : 'jpg'
      })
      .fetch('GET', 'http://192.168.1.121:8000/images/1479110439.jpg', {
        
      })
      .progress((received, total) => {
        console.log('progress', received / total)
      })
      .then((res) => {
        // the temp file path with file extension `png`
        console.log('The file saved to ', res.path())
        // Beware that when using a file path as Image source on Android,
        // you must prepend "file://"" before the file path
        fetchedImage = (
          <View>
            <Text>
              Yes?
            </Text>
            <Image 
              style={styles.detailsImage}
              source={{ uri : Platform.OS === 'android' ? 'file://' + res.path()  : '' + res.path() }}
            />
          </View>);
        this.setState({ fetchedImage });
        console.log(this.state.fetchedImage);
      })
      .catch((err) => {
        console.log("error with fetching file:");
        console.log(err);
      });
  },
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Laddar ner utställningar...
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
  },
  renderRow(rowData, sectionID, rowID) {
    return (
      <Text>
        {rowData}
      </Text>
    );
  },
  renderSectionHeader(sectionData, sectionID) {
    // console.log('renderSectionHeader');
    // console.log('sectionData');
    // console.log(sectionData);
    const exhibition = this.props.nodes[sectionData];
    let title = findText(exhibition, this.props.texts, 'section', 'title', 'sv').text;
    

    // for(i in this.props.texts)
    // {
    //   const text = texts[i];
    //   // console.log('text');
    //   // console.log(text);
    //   // console.log(text.text);
    //   if (text.parent_id == exhibition.id && text.type=='title' && text.language=='sv')
    //   {
    //     title = text.text
    //   }
    // }
    
    return (
      // <TouchableHighlight onPress={() => Actions.stationList(sectionID)}>
      <View>
        <TouchableHighlight
          onPress={() => Actions.stationList({ node: exhibition, title })}
        >
          <View>
          <Image
          source={{ uri: exhibition.image }}
          style={styles.exhibitionImage}
          />
          <View style={styles.listContainer}>
            <Text style={styles.listText}>{title}</Text>
          </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  renderListView() {
    return (
      <View>
        <ListView
          style={styles.listMargin}
          dataSource={myDataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          enableEmptySections
        />
        <View style={{ margin: 10, paddingTop: -10 }} >
          <TouchableHighlight
            onPress={() => { REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum2-symbols2.json'; this.fetchData(); }}
            style={{ margin: 5 }}
          >
            <Text>
              Version 1
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum2-numbers.json'; this.fetchData(); }}
            style={{ margin: 5 }}
          >
            <Text>
              Version 2
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum2-symbols.json'; this.fetchData(); }}
            style={{ margin: 5 }}
          >
            <Text>
              Version 3
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  render() {
    let navbar = (<NavBar title={this.props.title} noBackButton />);
    if (!this.props.loaded) {
      let loadingView = this.renderLoadingView();
      return (
        <View style={styles.screenContainer}>
          <View>{navbar}</View>
          {loadingView}
        </View>
      );
    }
    let listView = this.renderListView();
    return (
      <View style={styles.screenContainer}>
        <View>{navbar}</View>
        <TouchableHighlight
          onPress={() => { this.fetchData(); }}
          style={{ margin: 5 }} >
            <Text>
              Reload
            </Text>
        </TouchableHighlight>
        {this.state.fetchedImage}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {listView}
        </ScrollView>
      </View>
    );
  },
});

const mapStateToProps = (state) => {
  return {
    // exhibitions: state.exhibitions.exhibitions,
    // sections: state.exhibitions.sections,
    // stations: state.exhibitions.stations,
    nodes: state.exhibitions.nodes,
    texts: state.exhibitions.texts,
    images: state.exhibitions.images,
    audio: state.exhibitions.audio,
    video: state.exhibitions.video,
    loaded: state.exhibitions.loaded,
  };
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps)(ExhibitionList);
