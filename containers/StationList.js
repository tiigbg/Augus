import React from 'react';
import { ListView, TouchableHighlight, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';

// FIXME this is temporarily hardcoded
const darkColors = ['#694628', '#007da0', '#e1057d', '#007da0', '#e1057d'];
const lightColors = ['#ebdcd2', '#d5e9f3', '#ffdce6', '#d5e9f3', '#ffdce6'];

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const StationList = React.createClass({
  getInitialState() {
    console.log('StationList getInitialState props:');
    console.log(this.props);
    const exhibition = this.props.exhibitions[this.props.exhibition.id];
    const exhibitionSections = this.props.sections;
    const stations = this.props.stations;
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    for (const id in exhibitionSections){
      // don't confuse museum sections and list sections here
      const exhibitionSection = exhibitionSections[id];
      if (exhibitionSection.exhibition === exhibition.id) {
        sectionIDs.push(`${id}`);
        // rowIDs.push(`${id}`);
        dataBlob[`${id}`] = id;
        // rowIDs[`${id}`] = [];
        rowIDs.push([]);
        console.log('Adding rowID '+id);
        // add all stations for this section
        for (const stationId in stations) {
          if (stations[stationId].exhibition === exhibition.id
            && stations[stationId].section === exhibitionSection.id) {
            rowIDs[rowIDs.length-1].push(`${stationId}`);
            dataBlob[`${id}:${stationId}`] = `${id}:${stationId}`;
          }
        }
      }
    }
    console.log('StationList getInitialState rowIDs:');
    console.log(rowIDs.length);
    console.log(rowIDs);
    console.log('StationList getInitialState sectionIDs:');
    console.log(sectionIDs.length);
    console.log(sectionIDs);
    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    return {
      myDataSource,
    };
  },
  renderRow(rowData, sectionID, rowID) {
    console.log('stationList renderRow '+sectionID+':'+rowID);
    console.log(rowData);
    const station = this.props.stations[rowID];
    return (
      <View>
        <TouchableHighlight
          onPress={() => Actions.stationScreen(
          { station, title: station.station_name.sv })}
        >
          <View style={[styles.listContainer, {backgroundColor: lightColors[sectionID]}]}>
            <View style={styles.rightContainer}>
              <Text style={[styles.listText, { color: '#000' }]}>
                {station.station_name.sv}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  renderSectionHeader(sectionData, sectionID) {
    console.log('stationList renderSectionHeader '+sectionID);
    const section = this.props.sections[sectionID];
    console.log(section.section_name.sv);
    return (
      // <TouchableHighlight onPress={() => Actions.stationList({ sectionID })}>
      //   <View style={styles.listContainer}>
      //     <Image
      //       source={{ uri: exhibition.image }}
      //       style={styles.exhibitionImage}
      //     />
      //     <Text style={styles.listText}>{exhibition.exhibition_name.sv}</Text>
      //   </View>
      // </TouchableHighlight>
      <View>
        <View style={[styles.listContainer, { backgroundColor: darkColors[sectionID] }]}>
          <View style={styles.rightContainer}>
            <Text
              style={[styles.listText, { fontWeight: 'bold',color: '#fff' }]}
            >
              {section.section_name.sv}
            </Text>
          </View>
        </View>
      </View>
    );
  },
  //
  // renderSection(section) {
  //   let stations = [];
  //   console.log(section.stations);
  //   console.log(section.stations.length);
  //
  //   for (let i = 0; i < section.stations.length; i++) {
  //     const station = section.stations[i];
  //     stations.push(
  //       <View key={i}>
  //         <TouchableHighlight
  //           onPress={() => Actions.stationScreen(
  //           { station, title: station.station_name.sv })}
  //         >
  //           <View style={styles.listContainer}>
  //             <View style={styles.rightContainer}>
  //               <Text style={styles.listText}>{station.station_name.sv}</Text>
  //             </View>
  //           </View>
  //         </TouchableHighlight>
  //       </View>
  //     );
  //   }
  //   return (
  //     <View>
  //       <View style={styles.listCategoryContainer}>
  //       </View>
  //       {stations}
  //     </View>
  //     // <Text style={styles.listCategoryText}>{section.section_name.sv.toUpperCase()}</Text>
  //   );
  // },
  render() {
    // if (this.props.dataSource == null) {
    //   console.log('Datasource null');
    //   return (
    //     <Text>loading</Text>
    //     );
    // }
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
});

const mapStateToProps = (state) => {
  console.log('StationList mapStateToProps state:');
  console.log(state);
  return {
    exhibitions: state.exhibitions.exhibitions,
    sections: state.exhibitions.sections,
    stations: state.exhibitions.stations,
    loaded: state.exhibitions.loaded,
    selectedExhibition: state.selectedExhibition,
  };
};

export default connect(mapStateToProps)(StationList);
