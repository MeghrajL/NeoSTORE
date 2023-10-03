import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {colors} from '../../../assets/colors';
import GenericText from '../../Generic/GenericText/GenericText';

interface IContinueModalProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IContinueModalProps}
 * @description displayed after order is successfully placed & cannot be forced closed
 * @returns jsx for continue modal
 */

const ContinueModal = ({isVisible, onClose}: IContinueModalProps) => {
  return (
    <Portal>
      <Modal visible={isVisible} style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../../assets/images/success.png')}
              style={styles.imageStyle}
            />
            <GenericText style={styles.infoText}>
              Your order has beeen placed successfully. You can track it in the
              orders section.
            </GenericText>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <GenericText textType="medium" style={styles.closeButtonText}>
                Continue Shopping
              </GenericText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default ContinueModal;

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
  closeButton: {
    marginTop: 10,
    backgroundColor: colors.VIVID_GAMBOGE,
    padding: 10,
    borderRadius: 30,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  imageStyle: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  infoText: {
    color: colors.PLATINUM_GRAY,
    textAlign: 'center',
    fontSize: 14,
  },
  orderText: {
    color: colors.PLATINUM_GRAY,
    textAlign: 'center',
    fontSize: 16,
  },
});
