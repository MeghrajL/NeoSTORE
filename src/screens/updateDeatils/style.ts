import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    gap: 10,
  },
  formView: {
    // backgroundColor: 'red',

    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  titleFont: {
    paddingLeft: 13,
    fontSize: 12,
    color: colors.MIDNIGHT,
  },
  dateFont: {
    fontSize: 21,
    paddingLeft: 16,
    color: colors.MIDNIGHT,
  },
  imageStyle: {
    height: '70%',
    width: '70%',
    resizeMode: 'contain',
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
    paddingTop: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
