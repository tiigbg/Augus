import React from 'react';
import { Image, ListView, TouchableHighlight, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';
import { findColors, findSymbol } from '../util/station.js';

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

let renderSectionHeaders = false;

const StationList = React.createClass({
  getInitialState() {
    console.log('StationList getInitialState props:');
    console.log(this.props);
    const nodes = this.props.nodes;
    const exhibition = nodes[this.props.node.id];
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    for (const id in nodes){
      // don't confuse museum sections and list sections here
      const node = nodes[id];
      if (node.parent === exhibition.id) {
        sectionIDs.push(`${id}`);
        // rowIDs.push(`${id}`);
        dataBlob[`${id}`] = id;
        // rowIDs[`${id}`] = [];
        rowIDs.push([]);
        console.log('Adding rowID '+id);
        // add all stations for this section
        for (const subId in nodes) {
          const subNode = nodes[subId];
          if (subNode.parent === node.id) {
            rowIDs[rowIDs.length-1].push(`${subId}`);
            dataBlob[`${id}:${subId}`] = `${id}:${subId}`;
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
    renderSectionHeaders = false;
    if (sectionIDs.length > 1) {
      renderSectionHeaders = true;
    }
    console.log(renderSectionHeaders);
    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    return {
      myDataSource,
      renderSectionHeaders,
    };
  },
  renderRow(rowData, sectionID, rowID) {
    console.log('stationList renderRow '+sectionID+':'+rowID);
    console.log(rowData);
    const station = this.props.nodes[rowID];
    let openFunction = () => Actions.stationList({ node: station, title: station.name.sv });
    if (station.type === 'leaf') {
      openFunction = () => Actions.stationScreen(
        { station, title: station.name.sv, nodes: this.props.nodes }
      );
    }
    const symbolUrl = findSymbol(station, this.props.nodes);
    let symbol = (<View />);
    if (symbolUrl !== '') {
      symbol = (
        <Image
          source={{ uri: symbolUrl }}
          style={styles.stationSymbol}
        />);
    }
    const backgroundColor = findColors(station, this.props.nodes).light;
    const borderColor = findColors(station, this.props.nodes).dark;
    return (
      <View>
        <TouchableHighlight
          onPress={openFunction}
        >
          <View style={[styles.listContainer, { backgroundColor, borderColor, borderWidth: 3 }]}>
            <View style={styles.rightContainer}>
              {symbol}
              <Text style={[styles.listText, { color: '#000' }]}>
                {station.name.sv}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  renderSectionHeader(sectionData, sectionID) {
    if (!this.state.renderSectionHeaders) {
      return (<View></View>);
    }
    console.log('stationList renderSectionHeader '+sectionID);
    const section = this.props.nodes[sectionID];
    console.log(section.name.sv);
    const backgroundColor = findColors(section, this.props.nodes).dark;
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
        <View style={[styles.listContainer, { backgroundColor }]}>
          <View style={styles.rightContainer}>
            <Text
              style={[styles.listText, { fontWeight: 'bold',color: '#fff' }]}
            >
              {section.name.sv}
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
    // exhibitions: state.exhibitions.exhibitions,
    // sections: state.exhibitions.sections,
    // stations: state.exhibitions.stations,
    nodes: state.exhibitions.nodes,
    loaded: state.exhibitions.loaded,
    // selectedExhibition: state.selectedExhibition,
  };
};

export default connect(mapStateToProps)(StationList);
