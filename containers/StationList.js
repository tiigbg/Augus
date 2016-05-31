import React, {
  Image,
  ListView,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';
import * as AT from '../constants/ActionTypes';

//const StationList = React.createClass({
export default React.createClass({
  renderSection(section) {
    var stations = [];
    console.log(section.stations);
    console.log(section.stations.length);

    for (var i = 0; i < section.stations.length; i++)
    {
      let station = section.stations[i]
      stations.push(
      	<View>
          <TouchableHighlight onPress={() => Actions.exhibitionScreen({station , title: station.station_name.sv })}>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
              <Text style={styles.station_name}>{station.station_name.sv}</Text>
            </View>
          </View>
          </TouchableHighlight>
        </View>
      )
    }
    return (
      //<Image source={{ uri: adventure.thumbnail }} style={styles.thumbnail} />


        <View>
          <View style={styles.section_name_container}>
            <Text style={styles.section_name}>{section.section_name.sv}</Text>
          </View>
          { stations }
        </View>
    );
  },
  render() {
    console.log('render')
    console.log(this.state.dataSource)
    if (this.state.dataSource == null)
    {
      console.log("Datasource null");
      return(
        <Text>loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading
        loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading loading
        dataSource is null
        </Text>
      )
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderSection}
        style={styles.listView}
      />
    );
  },
  defaultRenderer(){
    return(
      <Text>hello</Text>
    )
  },
  getInitialState(){
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    console.log('getinitialstate');
    console.log(this.props.exhibition.sections);
    return {
      dataSource: dataSource.cloneWithRows(this.props.exhibition.sections),
    }
  },
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps')
    console.log(nextProps)
    // this.setState({
    //   dataSource: dataSource.cloneWithRows(this.nextProps.exhibition.sections),
    // });
  },

});

// const dataSource = new ListView.DataSource({
//   rowHasChanged: (r1, r2) => r1 !== r2,
// });
