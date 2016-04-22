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
  mainSection: {
    flexDirection: 'row',
  },
});
