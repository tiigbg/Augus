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
let componentColor = 'white';

let hMargin = 32;
let vMargin = 8;

let headerFont = 'foundrySterlingBook';
let textFont = 'arial';

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
    fontFamily: headerFont,
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
    fontFamily: textFont,
    fontSize: 20,
    textAlign: 'justify',
    flexWrap: 'wrap',
    flex: 1,
    color: readTextColor,
  },

  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  listContainer: {
    backgroundColor: componentColor,
    marginVertical: vMargin,
    marginHorizontal: hMargin - 8,
    padding: 8,
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
    fontFamily: textFont,
    fontSize: 22,
    color: readTextColor,
  },

  icon: {
    fontSize: 47,
    margin: 10,
    color: iconColor,
  },

  closeButton: {
    color: iconColor,
    textAlign: 'center',
    margin: 10,
    fontSize: 60,
  },

  closeButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
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
  },

  lightBox: {
    flex: 1,
    height: 280,
  },

  imageGalleryBox: {
    height: 280,
    justifyContent: 'center',
    flexDirection: 'column', 
    flex: 1, 
    alignItems: 'center', 
    borderColor: 'red', 
  },

  detailsImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
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

    height: 160,
    margin: 0,
  },

  bannerButton: {
    backgroundColor: componentColor,

    shadowOffset: { width: 0, height: 0, },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 3,

    borderColor: borderColor,
    borderWidth: borderSize,

    marginVertical: vMargin,
    marginHorizontal: hMargin,
    borderRadius: 5,
  },

  bannerButtonText: {
    fontFamily: headerFont,
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

    shadowOffset: { width: 0, height: 0, },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 1,
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
    fontFamily: headerFont,
    flex: 1,
    flexDirection: 'row',
    fontSize: 24,
    textAlign: 'left',
    justifyContent: 'center',
    color: buttonTextColor,
  },
});
