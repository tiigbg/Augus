import React from 'react';
import {Image, ListView, TouchableHighlight, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';
import * as AT from '../constants/ActionTypes';
// import { StationList } from 'StationList';

//const REQUEST_URL = 'https://gist.githubusercontent.com/Jickelsen/13c93e3797ee390cb772/raw/2def314de7cd6c3a44c31095d7298d46e6cdf061/adventures.json';
// const REQUEST_URL = 'https://gist.githubusercontent.com/nielsswinkels/cd70fffbde91a72df3a61defedc231d3/raw/d97b662e9b47063a8ba8d614e1f6776643db30eb/goteborgsstadsmuseum.json';
let REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum2.json';
// const REQUEST_URL = 'http://www.tiigbg.se/augus/tiny.json';

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const ExhibitionList = React.createClass({
  getInitialState() {
    return {
      loaded: false,
    };
  },
  componentDidMount() {
    this.fetchData();
  },
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
    const nodes = nextProps.nodes;
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    let iExh = 0;
    for (const i in nodes) {
      const node = nodes[i];
      if (node.isExhibition === true) {
        console.log('exhibition');
        console.log(node);
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
  },
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Laddar ner utställningar...
        </Text>
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
    console.log('renderSectionHeader');
    console.log('sectionData');
    console.log(sectionData);
    const exhibition = this.props.nodes[sectionData];
    console.log(exhibition);
    return (
      // <TouchableHighlight onPress={() => Actions.stationList(sectionID)}>
      <View>
        <TouchableHighlight
          onPress={() => Actions.stationList({ node: exhibition, title: exhibition.name.sv })}
        >
          <View style={styles.listContainer}>
            <Image
              source={{ uri: exhibition.image }}
              style={styles.exhibitionImage}
            />
            <Text style={styles.listText}>{exhibition.name.sv}</Text>
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
        <View style={{ margin: 10, paddingTop: 100 }} >
          <TouchableHighlight
            onPress={() => { REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum2.json'; this.fetchData(); }}
            style={{ margin: 10 }}
          >
            <Text>
              Normal
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { REQUEST_URL = 'http://www.tiigbg.se/augus/tiny.json'; this.fetchData(); }}
            style={{ margin: 10 }}
          >
            <Text>
              Simple
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { REQUEST_URL = 'http://www.tiigbg.se/augus/no_signlanguage.json'; this.fetchData(); }}
            style={{ margin: 10 }}
          >
            <Text>
              Ingen teckenspråk
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  render() {
    if (!this.props.loaded) {
      return this.renderLoadingView();
    }
    return this.renderListView();
  },
});

const mapStateToProps = (state) => {
  return {
    // exhibitions: state.exhibitions.exhibitions,
    // sections: state.exhibitions.sections,
    // stations: state.exhibitions.stations,
    nodes: state.exhibitions.nodes,
    loaded: state.exhibitions.loaded,
  };
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps)(ExhibitionList);
