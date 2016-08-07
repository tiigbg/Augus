import * as AT from '../constants/ActionTypes';
import { ListView } from 'react-native';


const initialState = {
  exhibitions: [
  ],
  loaded: false,
};

export default function Exhibitions(state = initialState, action) {
  switch (action.type) {
    case AT.MUSEUM_DATA_FETCH_SUCCEEDED:
      console.log("Exhibitions in the reducer are :");
      console.log(action.payload.exhibitions);
      // console.log("Loaded in the reducer is " + state.loaded);

      // convert and normalize JSON into state
      // TODO check that exhibitions exist?
      // parse exhibitions
      let exhibitions = {};
      let sections = {};
      let stations = {};
      let iSec = 0;
      let iStat = 0;
      for (let iExh = 0; iExh < action.payload.exhibitions.length; iExh++) {
        const exhibition = action.payload.exhibitions[iExh];
        exhibitions[iExh] = {
          id: iExh,
          exhibition_name: {
            sv: exhibition.exhibition_name.sv,
            en: 'english exhibition name',
          },
          image: 'image.jpg',
        };
        // parse sections
        for (let j = 0; j < exhibition.sections.length; j++) {
          const section = exhibition.sections[j];
          sections[iSec] = {
            id: iSec,
            exhibition: iExh,
            section_name: {
              sv: section.section_name.sv,
              en: 'english section name',
            },
          }
          // parse stations
          for (let k = 0; k < section.stations.length; k++){
            const station = section.stations[k];
            stations[iStat] = {
              id: iStat,
              section: iSec,
              exhibition: iExh,
              station_name: {
                sv: station.station_name.sv,
                en: 'english station name',
              },
            }
            iStat++;
          }
          iSec++;
        }
      }





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
        exhibitions,
        sections,
        stations,
        loaded: true,
      };
    case AT.MUSEUM_DATA_FETCH_FAILED:
      return state;
    default:
      return state;
  }
}
