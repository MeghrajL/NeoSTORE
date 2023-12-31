import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {Rating} from 'react-native-ratings';
import {Modal, Portal} from 'react-native-paper';
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/genericText/GenericText';
import ButtonAnimated from '../../generic/buttonAnimated/ButtonAnimated';

interface CustomModalProps {
  isVisible: boolean;
  isSettingRating: boolean;
  ratingSubmitted: boolean;
  onClose: () => void;
  onRatingSubmit: Function;
}
/**
 * @author Meghraj Vilas Lot
 * @param {CustomModalProps}
 * @description renders modal from rn paper and allows user to set rating
 * @returns jsx for rating modal
 */

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
            <GenericText style={styles.infoText}>Rate Product</GenericText>

            <Rating
              showRating
              onFinishRating={onFinishRating}
              startingValue={0}
              style={{paddingVertical: 10}}
            />
            <ButtonAnimated
              onPress={() => onRatingSubmit(rating)}
              title="Submit"
              fontSize={22}
              isDone={ratingSubmitted}
              isLoading={isSettingRating}
            />
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
