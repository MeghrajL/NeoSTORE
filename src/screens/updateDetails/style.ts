import {StyleSheet} from 'react-native';
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
  contentContainer: {gap: 30, paddingTop: 15, paddingBottom: 30},
  dateView: {paddingLeft: 10, width: '100%'},
  dateOuter: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '93%',
    height: 60,
    gap: 10,
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 0.7,
  },
  dateInnerView: {
    flexDirection: 'row',
    paddingLeft: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  picContainer: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
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
