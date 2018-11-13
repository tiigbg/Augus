import { StyleSheet, } from 'react-native';

let buttonTextColor = '#8c1b1b';
let readTextColor = 'white';
let iconColor = '#8c1b1b';
let backColor = 'white';

let backgroundColor = '#885959';
let componentColor = 'white';

let hMargin = 32;
let vMargin = 8;

let backColor3 = 'red';
let backColor4 = 'purple';
let backColor5 = 'yellow';

let textFont = 'Foundry Sterling W01';

export default StyleSheet.create({
  /* textColor = 'red',
  backColor = 'blue',
  backColor2 = 'green',
  backColor3 = 'silver', */

  navigator: {
    flex: 1,
    backgroundColor: backColor,
  },

  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: backgroundColor,
  },

  body_container: {
    flexGrow: 80,
  },

  listMargin: {
    marginTop: 5,
    marginBottom: 0,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backColor3,
  },

  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor: '#333333',
  },

  listCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backColor4,
    marginBottom: 16,
    marginRight: 8,
    marginLeft: 8,
    padding: 4,
  },

  listContainer: {
    backgroundColor: componentColor,
    marginVertical: vMargin,
    marginHorizontal: hMargin - 8,
    /* marginBottom: 16,
    marginRight: 8,
    marginLeft: 8, */
    padding: 8,
    //height: 320,
    borderRadius: 5,
  },

  listText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 28,
    textAlign: 'left',
    justifyContent: 'center',
    color: buttonTextColor,
  },

  listCategoryText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 28,
    textAlign: 'center',
    justifyContent: 'center',
    color: buttonTextColor,
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

  navbar_container: {
    flexGrow: 1,
  },

  stationTitlePane: {
    justifyContent: 'space-between',
    flexGrow: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },

  station_name: {
    fontSize: 32,
    margin: 0,
    marginTop: 10,
    marginBottom: 14,
    textAlign: 'center',
    fontWeight: '500',
    flexWrap: 'wrap',
    flex: 1,
  },

  backButton: {
    fontSize: 32,
    margin: 5,
    marginRight: 25,
    marginLeft: 25,
    textAlign: 'center',
    fontWeight: '500',
    color: buttonTextColor,
  },

  station_text: {
    fontSize: 22,
    color: readTextColor,
    marginTop: 0,
    marginBottom: 14,
  },

  listView: {
    paddingTop: 64,
    backgroundColor: backColor3,
  },

  contentContainer: {
    padding: 10,
    paddingTop: 5,
    //paddingBottom: 50,
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

  imageDescription: {
    fontSize: 22,
    color: readTextColor,
  },

  expandIconBox: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -64,
    marginBottom:0,
    marginRight:-75,
  },

  expandIcon: {
    fontSize: 48,
    color: iconColor,
    backgroundColor: backColor,
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    paddingBottom: 5,
    paddingRight: 5,
    marginRight: 5,
  },

  collapseIconTouch:{
    borderWidth:3,
    borderColor:'black',
    borderRadius:5,
    backgroundColor: iconColor,
  },

  collapseIcon: {
    fontSize: 35,
    color: readTextColor,
    padding: 10,
  },

  detailsImage: {
    width: 200,
    height: 200,
    backgroundColor: '#eaeaea',
  },

  closeButton: {
    color: iconColor,
    textAlign: 'center',
    margin: 10,
    // alignSelf: 'center',
    fontSize: 60,
  },

  closeButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    //borderColor: backColor,
    //borderRadius: 5,
    margin: 5,
    alignSelf: 'flex-start',
    backgroundColor: backColor,
  },

  playPauseButton: {
    fontSize: 40,
    borderWidth:3,
    borderColor:'black',
    borderRadius:5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingTop: 8,
    marginRight:5,
    backgroundColor: backColor,
  },

  exhibitionImage: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'stretch',
    height: 160,
    //backgroundColor: backColor5,
    //borderWidth: 3,
    //borderColor: '#007da0',
    /* marginRight: -10,
    marginLeft: -10,
    marginTop: -10, */
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    //padding: 8,
  },

  stationSymbol: {
    height: 40,
    width: 40,
    marginRight: 10,

  },

  imageGallery: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#888',
  },

  imageGalleryBox: {
    justifyContent: 'center',
    flexDirection:'column', 
    flex:1, 
    alignItems: 'center', 
    borderColor:'rgba(0, 0, 0, 0.1)', 
    borderWidth:1, 
    padding: 10, 
    marginRight:5, 
    marginLeft:5, 
    backgroundColor: '#eee',
    borderRadius: 10,
  },

  imageCaption: { 
    flexGrow: 1,
    borderWidth: 10,
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

  bannerButton: {
    backgroundColor: componentColor,
    marginVertical: vMargin,
    marginLeft: hMargin,
    marginRight: hMargin,
    padding: 16,
    height: 320,
    borderRadius: 5,
  },

  simpleButton: {
    backgroundColor: componentColor,
    marginVertical: vMargin,
    marginHorizontal: hMargin,
    padding: 16,
    height: 80,
    borderRadius: 5,
  },
});
