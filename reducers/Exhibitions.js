import * as AT from '../constants/ActionTypes';
import { put } from 'redux-saga/effects';

const initialState = {
  exhibitions: [
  ],
  loaded: false,
};

let iNode = 0;
let nodes = [];

// function parseNode(node, iParent) {
//   nodes[iNode] = {
//     id: iNode,
//     isExhibition: false,
//     parent: iParent,
//   };
//   Object.assign(nodes[iNode], node, { nodes: null });
//   iNode++;
//   if (node.type != 'leaf') {
//     const parent = iNode - 1;
//     for (const i of node.nodes) {
//       parseNode(i, nodes[parent].id);
//     }
//   }
// }

export default function Exhibitions(state = initialState, action) {
  switch (action.type) {
    case AT.MUSEUM_DATA_FETCH_SUCCEEDED:
      //console.log("Exhibitions in the reducer are :");
      //console.log(action.payload);

      // convert and normalize JSON into state

      // check that nodes exist?
      if (!action.payload.nodes) {
        put({
          type: AT.MUSEUM_DATA_FETCH_FAILED,
          message: 'The loaded data was empty or unreadable.',
        });
      }
      // Laravel data parser
      nodes = JSON.parse(JSON.stringify(action.payload.nodes));
      texts = JSON.parse(JSON.stringify(action.payload.texts));
      images = JSON.parse(JSON.stringify(action.payload.images));
      icons = JSON.parse(JSON.stringify(action.payload.icons));
      audio = JSON.parse(JSON.stringify(action.payload.audio));
      video = JSON.parse(JSON.stringify(action.payload.video));
      signlanguages = JSON.parse(JSON.stringify(action.payload.signlanguages));
      meshes = JSON.parse(JSON.stringify(action.payload.meshes));
      triggerMarkers = JSON.parse(JSON.stringify(action.payload.triggerMarkers));
      
      global.storage.save({
        key: 'json',   // Note: Do not use underscore("_") in key!
        data: { 
            nodes,
            texts,
            images,
            icons,
            audio,
            video,
            signlanguages,
            meshes,
            triggerMarkers,
        },

        // if not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        //expires: 1000 * 3600
      });

      
      return {
        // exhibitions: action.payload.exhibitions,
        // exhibitions,
        // sections,
        // stations,
        nodes,
        texts,
        images,
        icons,
        audio,
        video,
        signlanguages,
        meshes,
        triggerMarkers,
        loaded: true,
      };
    case AT.MUSEUM_DATA_FETCH_FAILED:
      return state;
    case AT.MUSEUM_DATA_LOADED_FROM_CACHE:
      return {
        nodes: action.data.nodes,
        texts: action.data.texts,
        images: action.data.images,
        icons: action.data.icons,
        audio: action.data.audio,
        video: action.data.video,
        signlanguages: action.data.signlanguages,
        meshes: action.data.meshes,
        triggerMarkers: action.data.triggerMarkers,
        loaded: true,
      };
    default:
      return state;
  }
}
