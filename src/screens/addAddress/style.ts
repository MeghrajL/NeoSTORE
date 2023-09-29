import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  formView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  contentContainer: {gap: 30, paddingTop: 15, paddingBottom: 60},

  conFont: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  radioStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 5,
  },
  circle: {
    borderWidth: Platform.OS === 'ios' ? 0.25 : 0,
    borderColor: colors.MIDNIGHT,
    borderRadius: 30,
    height: 37,
    width: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {},

  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    // backgroundColor: 'pink',
  },
  picContainer: {
    alignSelf: 'center',
    width: 100, // Adjust the width and height as needed
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red', // Background color for the container
    // borderRadius: 100, // Make it a circle
    overflow: 'hidden', // Clip child elements to the container's bounds
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    zIndex: 1,
  },
  imageContainer: {
    backgroundColor: 'white',
    height: 100,
    // width: 100,
    borderWidth: 0.5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  submitButtonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 400,
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    paddingTop: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
