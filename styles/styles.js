import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'white',
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
    fontSize: 22,
    marginTop: 0,
    marginBottom: 14,
    textAlign: 'center',
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
    paddingTop: 64,
    padding: 10,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
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
  col: {
    flex: 1,
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
  video: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  lightBox: {
    flex: 1,
    height: 150,
  },
});
