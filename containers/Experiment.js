import React from 'react';
import {Image, ListView, TouchableHighlight, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';
import * as AT from '../constants/ActionTypes';

const REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum.json';

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const Experiment = React.createClass({
  getInitialState() {
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];

    return {
      loaded: false,
    };
  },
  componentDidMount() {
    this.fetchData();
  },
  fetchData() {
    const { dispatch } = this.props;
    dispatch({ type: AT.MUSEUM_DATA_FETCH_REQUESTED, payload: { REQUEST_URL } });
  },
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
    const exhibitions = nextProps.exhibitions;
    console.log('componentWillUpdate:exhibitions.length');
    console.log(exhibitions.length);
    let dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    // dataBlob = {
    //   's1':'section1',
    //   's2':'section2',
    //   's1:r1':'section1 row1',
    //   's1:r2':'section1 row2',
    //   's2:r1':'section2 row1',
    //   's2:r2':'section2 row2'+(exhibitions==null),
    // };
    //
    // sectionIDs.push('s1');
    // sectionIDs.push('s2');
    // rowIDs[0] = [];
    // rowIDs[1] = [];
    // rowIDs[0].push('r1');
    // rowIDs[0].push('r2');
    // rowIDs[1].push('r1');
    // rowIDs[1].push('r2');
    //
    // for (let i = 0; i < exhibitions.length; i++) {
    //   const exhibition = exhibitions[i];
    //   sectionIDs.push(i+'');
    //   dataBlob[i+''] = exhibition.exhibition_name.sv;
    //   rowIDs[i+''] = [];
    //   for (let j = 0; j < exhibition.sections.length; j++) {
    //     rowIDs[i+''].push(j+'');
    //     dataBlob[i+':'+j] = exhibition.sections[j].section_name.sv;
    //   }
    // }

    console.log('Experiment:exhibitions');
    console.log(exhibitions);
    for (id in exhibitions){
      console.log(exhibitions[id]);
      console.log(exhibitions[id].exhibition_name.en);

      // console.log(exhibition['exhibition_name']['en']);
    }


    // for (let i = 0; i < exhibitions.length; i++) {
    for (id in exhibitions){
      const exhibition = exhibitions[id];
      sectionIDs.push(id+'');
      dataBlob[id+''] = exhibition.exhibition_name.sv;
      rowIDs[id+''] = [];
      // for (let j = 0; j < exhibition.sections.length; j++) {
      //   rowIDs[i+''].push(j+'');
      //   dataBlob[i+':'+j] = exhibition.sections[j].section_name.sv;
      // }
    }

    console.log('-----------dataBlob------------------');
    console.log(dataBlob);

    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);

    console.log('-----------myDataSource------------------');
    console.log(myDataSource);


    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    //   loaded: true,
    // });
  },
  renderRow(rowData, sectionID, rowID) {
    return (
      <Text>
        {rowData}
      </Text>
    );
  },
  renderSectionHeader(sectionData, sectionID) {
    return (
      <View>
        <Text>
          -----------------------------
        </Text>
        <Text>
          {sectionData}
        </Text>
        <Text>
          -----------------------------
        </Text>
      </View>
    );
  },
  renderListView() {
    return (
      <View>
        <Text>
          Loaded
        </Text>
        <Text>
          Loaded
        </Text>
        <Text>
          Loaded
        </Text>
        <Text>
          Loaded
        </Text>
        <Text>
          Loaded
        </Text>
        <Text>
          Loaded
        </Text>
        <ListView
          dataSource = {myDataSource}
          renderRow  = {this.renderRow}
          renderSectionHeader = {this.renderSectionHeader}
          enableEmptySections
          />
      </View>
    );
  },
  render() {
    if (!this.props.loaded) {
      return (
        <View>
          <Text>
            Hello
          </Text>
          <Text>
            Hello
          </Text>
          <Text>
            Hello
          </Text>
          <Text>
            Hello
          </Text>
          <Text>
            Hello
          </Text>
          <Text>
            Hello..
          </Text>
        </View>
      );
    }



    return this.renderListView();
  },
});

const mapStateToProps = (state) => {
  return {
    // exhibitions: state.exhibitions.exhibitions,
    exhibitions: state.exhibitions.exhibitions,
    sections: state.exhibitions.sections,
    stations: state.exhibitions.stations,
    loaded: state.exhibitions.loaded,
  };
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps)(Experiment);
