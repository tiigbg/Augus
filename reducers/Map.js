import * as AT from '../constants/ActionTypes';

const initialState = {
  region: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  markers: [
    {latlng: {
      latitude: 37.78825,
      longitude: -122.4324,},
     title: "Marker 1",
     description: "A marker"},
    {latlng: {
      latitude: 37.77,
      longitude: -122.43,},
     title: "Marker 2",
     description: "Another marker"}
  ],
  polygons: [
    { coordinates: [
      {latitude: 37.78715,
       longitude: -122.4334,},
      {latitude: 37.78225,
       longitude: -122.4524,},
      {latitude: 37.76125,
       longitude: -122.4394,},
    ] },
  ],
};

function markers(state = initialState.markers, action) {
  switch (action.type) {
  case AT.LONG_PRESS_ON_MAP:
    return [
        ...state,
      {latlng: action.coord,
       title: "Whatever",
       description: "Stuff" },
    ];
  default:
    return state;
  }
}

function polygons(state = initialState.polygons, action) {
  switch (action.type) {
  case AT.SHORT_PRESS_ON_MAP:
    return [
      { coordinates:
        [...state[0].coordinates,
         action.coord],
      }];
  default:
    return state;
  }
}

export default function Map(state = initialState, action) {
  switch (action.type) {
    default:
    return {
      region: state.region,
      markers: markers(state.markers, action),
      polygons: polygons(state.polygons, action),
    };
  }
}
