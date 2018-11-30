import { StyleSheet, } from 'react-native';

let svKyrkanRed = '#f92c16';
let svKyrkanYellow = '#ffc734';
let customRedBrown = '#8c1b1b';

let buttonTextColor = '#8c1b1b';
let readTextColor = '#8c1b1b';
let iconColor = '#8c1b1b';
let backColor = svKyrkanYellow;

let borderColor = customRedBrown;
let borderSize = 0;
//let backgroundColor = 'white';
let componentColor = 'white';

let hMargin = 32;
let vMargin = 8;

let backColor3 = 'red';
let backColor4 = 'purple';
let backColor5 = 'yellow';

let textFont = 'Foundry Sterling W01';

export default StyleSheet.create({

  //General
  navigator: {
    flex: 1,
    backgroundColor: backColor,
  },

  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: backColor,
  },

  scrollListContainer: {
    flexGrow: 80,
  },

  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backColor,
  },

  stationContentContainer: {
    marginVertical: vMargin,
    paddingHorizontal: hMargin,
  },

  //Text
  title: {
    fontSize: 26,
    marginVertical: vMargin * 2,
    padding: 0,
    textAlign: 'center',
    fontWeight: '500',
    flexWrap: 'wrap',
    flex: 1,
    color: readTextColor,
  },

  stationText: {
    fontSize: 20,
    /* marginHorizontal: hMargin,
    padding: 0, */
    textAlign: 'justify',
    flexWrap: 'wrap',
    flex: 1,
    color: readTextColor,
  },

  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor: '#333333',
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

  tabIcon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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

  stationSymbol: {
    height: 40,
    width: 40,
    marginRight: 10,
  },

  // Station images
  imageGallery: {
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    //backgroundColor: '#888',
  },

  lightBox: {
    flex: 1,
    height: 280,
  },

  imageGalleryBox: {
    //width: 280,
    height: 280,
    justifyContent: 'center',
    flexDirection: 'column', 
    flex: 1, 
    alignItems: 'center', 
    borderColor: 'red', 
    //borderWidth:1, 
    //padding: 10, 
    //marginRight:5, 
    //marginLeft:5, 
    //backgroundColor: '#eee',
    //borderRadius: 10,
  },

  detailsImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    //backgroundColor: '#eaeaea',
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

  exhibitionImage: {
    flex: 1,
    flexDirection: 'row',
    //alignSelf: 'stretch',
    //alignItems: 'stretch',
    height: 160,
    //width: undefined,
    //backgroundColor: 'red',
    margin: 0,
    //borderWidth: 3,
    //borderColor: '#007da0',
    /* marginRight: -10,
    marginLeft: -10,
    marginTop: -10, */
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    //padding: 8,
  },

  bannerButton: {
    backgroundColor: componentColor,

    shadowOffset: { width: 3, height: 3, },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,

    borderColor: borderColor,
    borderWidth: borderSize,

    marginVertical: vMargin,
    marginHorizontal: hMargin,
    //padding: 16,
    //height: 320,
    borderRadius: 5,
  },

  bannerButtonText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 24,
    textAlign: 'left',
    justifyContent: 'center',
    color: buttonTextColor,
    margin: 16,
  },

  simpleButton: {
    backgroundColor: componentColor,

    shadowOffset: { width: 3, height: 3, },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,

    borderColor: borderColor,
    borderWidth: borderSize,

    marginVertical: vMargin,
    marginHorizontal: hMargin,
    padding: 16,
    minHeight: 70,
    borderRadius: 5,
  },

  listText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 24,
    textAlign: 'left',
    justifyContent: 'center',
    color: buttonTextColor,
  },
});
