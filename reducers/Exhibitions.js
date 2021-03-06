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
      
      global.storage.save({
        key: 'json',   // Note: Do not use underscore("_") in key!
        rawData: { 
            nodes,
            texts,
            images,
            icons,
            audio,
            video,
            signlanguages,
        },

        // if not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        //expires: 1000 * 3600
      });

      // end laravel data parser

      // new version
      // nodes = [];
      // iNode = 0;
      // for (const exhibition of action.payload.exhibitions) {
      //   nodes[iNode] = {
      //     id: iNode,
      //     isExhibition: true,
      //     parent: null,
      //   };
      //   Object.assign(nodes[iNode], exhibition, { nodes: null });
      //   iNode++;
      //   const parent = iNode - 1;
      //   for (const j of exhibition.nodes) {
      //     parseNode(j, nodes[parent].id);
      //   }
      // }

      //console.log('Parsed data into list of nodes:');
      //console.log(nodes);
      // console.log(nodes instanceof Array);
      //
      // // parse exhibitions
      // const exhibitions = {};
      // const sections = {};
      // const stations = {};
      // let iSec = 0;
      // let iStat = 0;
      // for (let iExh = 0; iExh < action.payload.exhibitions.length; iExh++) {
      //   const exhibition = action.payload.exhibitions[iExh];
      //   exhibitions[iExh] = {
      //     id: iExh,
      //   };
      //   Object.assign(exhibitions[iExh], exhibition);
      //   // parse sections
      //   for (let j = 0; j < exhibition.sections.length; j++) {
      //     const section = exhibition.sections[j];
      //     sections[iSec] = {
      //       id: iSec,
      //       exhibition: iExh,
      //     };
      //     Object.assign(sections[iSec], section);
      //     // parse stations
      //     for (let k = 0; k < section.stations.length; k++){
      //       const station = section.stations[k];
      //       stations[iStat] = {
      //         id: iStat,
      //         section: iSec,
      //         exhibition: iExh,
      //       };
      //       Object.assign(stations[iStat], station);
      //       iStat++;
      //     }
      //     iSec++;
      //   }
      // }





      // here i should parse the json of the exhibitions ?

      // const exhibitions = action.payload.exhibitions;
      //
      // let dataBlob = {};
      // const sectionIDs = [];
      // const rowIDs = [];
      // dataBlob = {
      //   's1':'section1',
      //   's2':'section2',
      //   's1:r1':'section1 row1',
      //   's1:r2':'section1 row2',
      //   's2:r1':'section2 row1',
      //   's2:r2':'section2 row2'+(exhibitions==null),
      // };
      //
      // sectionIDs.push('s1');
      // sectionIDs.push('s2');
      // rowIDs[0] = [];
      // rowIDs[1] = [];
      // rowIDs[0].push('r1');
      // rowIDs[0].push('r2');
      // rowIDs[1].push('r1');
      // rowIDs[1].push('r2');
      //
      //
      // // for (let i = 0; i < exhibitions.length; i++) {
      // //   const exhibition = exhibitions[i];
      // //   sectionIDs.push(i+'');
      // //   dataBlob[i+''] = exhibition;
      // //   rowIDs[i+''] = [];
      // //   for (let j = 0; j < exhibition.sections.length; j++) {
      // //     rowIDs[i+''].push(j+'');
      // //     dataBlob[i+':'+j] = exhibition.sections[j];
      // //   }
      // // }
      //
      // console.log('Exhibition:dataBlob:');
      // console.log(dataBlob);
      //
      // let derp = new ListView.DataSource({
      //   derp: 'derp',
      //   rowHasChanged: (row1, row2) => row1 !== row2,
      //   sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      // });
      // derp.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
      //
      // console.log('Exhibition:dataSource:');
      // console.log(derp);
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
        loaded: true,
      };
    default:
      return state;
  }
}
