import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'white',
  },
  listMargin: {
    marginTop: 70,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    // backgroundColor: '#333333',
  },
  listCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1057d',
    marginBottom: 16,
    marginRight: 8,
    marginLeft: 8,
    padding: 4,
  },
  listContainer: {
    backgroundColor: '#007da0',
    marginBottom: 16,
    marginRight: 8,
    marginLeft: 8,
    padding: 8,
  },
  listText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 28,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  listCategoryText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 28,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  tabIcon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  thumbnail: {
    width: 120,
    height: 81,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  section_name: {
    fontSize: 20,
    marginBottom: 4,
    textAlign: 'center',
  },
  section_name_container: {
    backgroundColor:"#e1057d",
    marginBottom: 4,
  },
  station_name: {
    flex: 1,
    fontSize: 28,
    marginTop: 0,
    marginBottom: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  station_text: {
    fontSize: 22,
    marginTop: 0,
    marginBottom: 14,
  },
  listView: {
    paddingTop: 64,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    padding: 10,
    paddingTop: 64,
    paddingBottom: 50,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  stationTitlePane: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  adventureTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '500',
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  detailsImage: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  exhibitionImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 100,
    backgroundColor: '#eaeaea',
    marginTop: -8,
    marginRight: -8,
    marginLeft: -8,
  },
  mainSection: {
    flexDirection: 'row',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  colStretch: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  video: {
    height: 210,
    alignSelf: 'stretch',
  },
  lightBox: {
    flex: 1,
    height: 150,
  },
});
