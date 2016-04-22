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

const REQUEST_URL = 'https://gist.githubusercontent.com/Jickelsen/13c93e3797ee390cb772/raw/2def314de7cd6c3a44c31095d7298d46e6cdf061/adventures.json';

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
  renderAdventure(adventure) {
    return (
        <TouchableHighlight onPress={() => Actions.adventureScreen({ adventure, title: adventure.title })}>
        <View style={styles.container}>
          <Image source={{ uri: adventure.thumbnail }} style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{adventure.title}</Text>
            <Text style={styles.year}>Playeers: {adventure.players}</Text>
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
    adventures: state.adventures.adventures,
    dataSource: dataSource.cloneWithRows(state.adventures.adventures),
    loaded: state.adventures.loaded,
  };
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps)(AdventureList);
