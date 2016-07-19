import React from 'react';
import { ListView, TouchableHighlight, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';


export default React.createClass({
  getInitialState() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    console.log('getinitialstate');
    console.log(this.props.exhibition.sections);
    return {
      dataSource: dataSource.cloneWithRows(this.props.exhibition.sections),
    };
  },
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(nextProps);
    // this.setState({
    //   dataSource: dataSource.cloneWithRows(this.nextProps.exhibition.sections),
    // });
  },
  defaultRenderer() {
    return (
      <Text>hello</Text>
    );
  },
  renderSection(section) {
    let stations = [];
    console.log(section.stations);
    console.log(section.stations.length);

    for (let i = 0; i < section.stations.length; i++) {
      const station = section.stations[i];
      stations.push(
        <View key={i}>
          <TouchableHighlight
            onPress={() => Actions.stationScreen(
            { station, title: station.station_name.sv })}
          >
            <View style={styles.listContainer}>
              <View style={styles.rightContainer}>
                <Text style={styles.listText}>{station.station_name.sv}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.listCategoryContainer}>
        </View>
        {stations}
      </View>
      // <Text style={styles.listCategoryText}>{section.section_name.sv.toUpperCase()}</Text>
    );
  },
  render() {
    console.log('render');
    console.log(this.state.dataSource);
    if (this.state.dataSource == null) {
      console.log('Datasource null');
      return (
        <Text>loading</Text>
      );
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderSection}
        style={styles.listView}
      />
      // <ScrollView style={styles.scrollview}>
      // </ScrollView>
    );
  },
});

// const dataSource = new ListView.DataSource({
//   rowHasChanged: (r1, r2) => r1 !== r2,
// });
