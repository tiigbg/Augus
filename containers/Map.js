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
import MapView from 'react-native-maps';

const Map = React.createClass({
  componentWillReceiveProps(newProps) {
    // console.log("New props " + newProps.markers[newProps.markers.length-1].latlng.latitude);
  },
  render() {
    return (
      <MapView
        style={ styles.map }
        region= {this.props.region}
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
      >
        {this.props.markers.map(marker => (
           <MapView.Marker
             key={marker.latlng.latitude}
             coordinate={marker.latlng}
             title={marker.title}
             description={marker.description}
           />
         ))}
           {this.props.polygons.map(polygon => (
              <MapView.Polygon
                key={polygon.coordinates[0].latitude}
                coordinates={polygon.coordinates}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            ))}
      </MapView>
    );
  },
});

const mapStateToProps = (state) => {
  return {
    region: state.map.region,
    markers: state.map.markers,
    polygons: state.map.polygons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLongPress: (e) => {
      dispatch({ type: AT.LONG_PRESS_ON_MAP, coord: e.nativeEvent.coordinate });
    },
    onPress: (e) => {
      dispatch({ type: AT.SHORT_PRESS_ON_MAP, coord: e.nativeEvent.coordinate });
    }
  }
};

// upgrade our component to become Redux-aware
export default connect(mapStateToProps, mapDispatchToProps)(Map);
