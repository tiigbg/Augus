import React from 'react';
import { Image, ListView, TouchableHighlight, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { findColor, findSymbol, findNode, findText } from '../../util/station.js';

import styles from '../../styles/styles';

let icon_audio_sv = require('../../assets/img/upplast_text.png');
let icon_signlanguage_sv = require('../../assets/img/teckensprakstolkning_opaque.png');
let icon_text_sv = require('../../assets/img/textning.png');

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID];
let myDataSource = new ListView.DataSource({
  getSectionData,
  getRowData,
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

//
class StationList extends React.Component {

  //
  constructor(props){
    super(props);

    const nodes = this.props.nodes;

    // If used as a side menu display root stations, else find related stations
    let exhibitionID;
    if(this.props.isSideMenu){
      exhibitionID = 1;
    } else {
      //exhibition = findNode(this.props.navigation.state.params.node.id, nodes);
      exhibitionID = findNode(this.props.navigation.state.params.node.id, nodes).id;
    }

    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    sectionIDs.push(`0`);
    rowIDs[`0`] = [];
    for (const id in nodes){
      // don't confuse museum sections and list sections here
      const node = nodes[id];

      if (node.parent_id === exhibitionID) {
        rowIDs[0].push(`${id}`);
        dataBlob[`0:${id}`] = `0:${id}`;
      }
    }

    console.log("StationList.rowIDs: ", rowIDs);
    
    collapseText = (rowIDs[0].length > 0);
    myDataSource = myDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  }

  //
  static navigationOptions = ({ navigation }) => {
    console.log("StationList.navigationOptions");
    return {
      headerTitle: navigation.getParam('title')   
    };
  };

  //
  componentDidMount() {
    console.log("StationList.componentDidMount.navigation: ", this.props.navigation);

    if(this.props.isSideMenu){
      this.props.navigation.setParams({ 
        title: this.props.title,
        parent_id: 1,
        nodes: this.props.nodes,
        language: this.props.language,
        texts: this.props.texts,
      });
    } else {
      this.props.navigation.setParams({ 
        title: this.props.title,
        parent_id: this.props.navigation.state.params.node.parent_id,
        nodes: this.props.nodes,
        language: this.props.language,
        texts: this.props.texts,
      });
    }
  }

  //
  render() {
    return (
      <View style={ styles.screenContainer }>
        <ListView
          style={ styles.listMargin }
          dataSource={ myDataSource }
          renderRow={ this.renderRow.bind(this) }
          renderSectionHeader={ this.renderSectionHeader }
          enableEmptySections
        />
      </View>
    );
  }

  //
  renderSectionHeader(sectionData, sectionID) {
    return (<View></View>);
  }

  //
  renderRow(rowData, sectionID, rowID) {
    const station = this.props.nodes[rowID];
    let title = findText(
      station, this.props.texts, 'section', 'title', this.props.language).text;

    const symbol = findSymbol(station, this.props.nodes, this.props.icons);
    let symbolView = (<View />);
    if (symbol !== '') {
      symbolView = (
        <Image
          source={{ uri: this.props.baseUrl+'/iconFile/'+symbol.id }}
          style={styles.stationSymbol}
        />);
    }

    const backgroundColor = findColor(station, this.props.nodes, false);
    const borderColor = findColor(station, this.props.nodes, true);

    return (
      <View>
        <TouchableHighlight
          onPress={ () => this.onStationPressed(station, title) }
        >
          <View style={
            [styles.listContainer, { backgroundColor, borderColor, borderWidth: 3 }]}>
            <View style={styles.rightContainer}>
              {symbolView}
              <Text style={[styles.listText, { color: '#000' }]}>
                {title}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  // Handle on station selected
  onStationPressed(station, title){
    if (station.type === 'leaf') {
      // If sub station
      this.props.navigation.navigate(
        'StationScreen', { station, title, nodes: this.props.nodes });
    } else {
      // If root station
      this.props.navigation.push(
        'StationScreen', { node: station, title });
    }
  }
}

const mapStateToProps = (state) => {
  console.log("StationList.mapStateToProps");
  return {
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

export default connect(mapStateToProps)(StationList);
