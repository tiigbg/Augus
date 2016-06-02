import React from 'react';
import {Image, ListView, TouchableHighlight, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';
import * as AT from '../constants/ActionTypes';

//const REQUEST_URL = 'https://gist.githubusercontent.com/Jickelsen/13c93e3797ee390cb772/raw/2def314de7cd6c3a44c31095d7298d46e6cdf061/adventures.json';
// const REQUEST_URL = 'https://gist.githubusercontent.com/nielsswinkels/cd70fffbde91a72df3a61defedc231d3/raw/d97b662e9b47063a8ba8d614e1f6776643db30eb/goteborgsstadsmuseum.json';
//const REQUEST_URL = 'https://www.dropbox.com/s/brozcyqt4yf8jvu/goteborgsstadsmuseum.json?dl=0';
// const REQUEST_URL = 'https://drive.google.com/file/d/0Bzb0I-9LyL9BMDJKRmF6dG5TU1k/view?usp=sharing';
const REQUEST_URL = 'http://www.tiigbg.se/augus/goteborgsstadsmuseum.json';

const AdventureList = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: AT.ADVENTURES_FETCH_REQUESTED, payload: { REQUEST_URL } });
  },
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading adventures...
        </Text>
      </View>
    );
  },
  renderAdventure(exhibition) {
    return (
      //<Image source={{ uri: adventure.thumbnail }} style={styles.thumbnail} />
        <TouchableHighlight onPress={() => Actions.adventureScreen({ exhibition, title: exhibition.exhibition_name.sv })}>
        <View style={styles.container}>
        {/* <Text style={styles.year}>Playeers: {exhibition.players}</Text>*/}
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{exhibition.exhibition_name.sv}</Text>
          </View>
        </View>
        </TouchableHighlight>
    );
  },
  render() {
    if (!this.props.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderAdventure}
        style={styles.listView}
      />
    );
  },
});

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

// add some more props that come from the global state tree
const mapStateToProps = (state) => {
  return {
    exhibitions: state.exhibitions.exhibitions,
    dataSource: dataSource.cloneWithRows(state.exhibitions.exhibitions),
    loaded: state.exhibitions.loaded,
  };
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps)(AdventureList);
