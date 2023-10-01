import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {Modal, Portal} from 'react-native-paper';
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/GenericText/GenericText';
import GenericButton from '../../generic/GenericButton/GenericButton';
import {useState} from 'react';
import Load from '../../generic/Load/Load';
import Tick from '../../generic/Tick/Tick';

interface CustomModalProps {
  isVisible: boolean;
  isSettingRating: boolean;
  ratingSubmitted: boolean;
  onClose: () => void;
  onRatingSubmit: Function;
}

const RatingModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  onRatingSubmit,
  isSettingRating,
  ratingSubmitted,
}) => {
  const [rating, setRating] = useState(3);
  const onFinishRating = (rating: number) => {
    setRating(rating);
  };
  console.log(isSettingRating);
  return (
    <Portal>
      <Modal visible={isVisible} style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Image
              source={require('../../../assets/images/success.png')}
              style={styles.imageStyle}
            /> */}
            <GenericText style={styles.infoText}>Rate Product</GenericText>

            <Rating
              showRating
              onFinishRating={onFinishRating}
              style={{paddingVertical: 10}}
            />
            {/* <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onRatingSubmit(rating)}>
              <GenericText textType="medium" style={styles.closeButtonText}>
                Continue Shopping
              </GenericText> */}
            {isSettingRating ? (
              <Load />
            ) : !ratingSubmitted ? (
              <GenericButton
                // disabled={cartLoading}
                onPress={() => onRatingSubmit(rating)}
                title="Submit"
                fontSize={22}
                fontFamily="Gilroy-Medium"
                style={styles.checkoutButtonStyle}
                color="white"
              />
            ) : (
              <Tick />
            )}
            {/* </TouchableOpacity> */}
            <TouchableOpacity onPress={onClose}>
              <GenericText textType="medium" style={styles.orderText}>
                Close
              </GenericText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default RatingModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    gap: 8,
  },
  checkoutButtonStyle: {
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
  imageStyle: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  infoText: {
    color: colors.MIDNIGHT,
    textAlign: 'center',
    fontSize: 20,
  },
  orderText: {
    color: colors.PLATINUM_GRAY,
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 5,
  },
});