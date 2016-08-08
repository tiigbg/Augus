import React from 'react';
import {Image, ListView, TouchableHighlight, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';
import * as AT from '../constants/ActionTypes';
// import { StationList } from 'StationList';

//const REQUEST_URL = 'https://gist.githubusercontent.com/Jickelsen/13c93e3797ee390cb772/raw/2def314de7cd6c3a44c31095d7298d46e6cdf061/adventures.json';
// const REQUEST_URL = 'https://gist.githubusercontent.com/nielsswinkels/cd70fffbde91a72df3a61defedc231d3/raw/d97b662e9b47063a8ba8d614e1f6776643db30eb/goteborgsstadsmuseum.json';
const REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum.json';

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
    const exhibitions = nextProps.exhibitions;
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    for (const id in exhibitions){
      const exhibition = exhibitions[id];
      sectionIDs.push(`${id}`);
      dataBlob[`${id}`] = id;
      rowIDs[`${id}`] = [];
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
          Loading exhibitions...
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
    const exhibition = this.props.exhibitions[sectionID];
    return (
      // <TouchableHighlight onPress={() => Actions.stationList(sectionID)}>
      <View>
        <TouchableHighlight onPress={() => Actions.stationList({exhibition, title: exhibition.exhibition_name.sv})}>
          <View style={styles.listContainer}>
            <Image
              source={{ uri: exhibition.image }}
              style={styles.exhibitionImage}
            />
            <Text style={styles.listText}>{exhibition.exhibition_name.sv}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  renderListView() {
    return (
      <ListView
        style={styles.listMargin}
        dataSource={myDataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        enableEmptySections
      />
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
    exhibitions: state.exhibitions.exhibitions,
    sections: state.exhibitions.sections,
    stations: state.exhibitions.stations,
    loaded: state.exhibitions.loaded,
  };
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps)(ExhibitionList);
