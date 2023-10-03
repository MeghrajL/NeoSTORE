import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {colors} from '../../../assets/colors';
import GenericText from '../GenericText/GenericText';

interface IOptionModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IOptionModalProps}
 * @description displays confirm or cancel buttons
 * @returns jsx for Option modal
 */

const OptionModal = ({isVisible, onClose, onConfirm}: IOptionModalProps) => {
  return (
    <Portal>
      <Modal
        onDismiss={onClose}
        visible={isVisible}
        style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <GenericText style={styles.infoText}>Are you sure?</GenericText>
            <View style={{flexDirection: 'row', gap: 20}}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <GenericText textType="medium" style={styles.closeButtonText}>
                  Close
                </GenericText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}>
                <GenericText textType="medium" style={styles.closeButtonText}>
                  Confirm
                </GenericText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default OptionModal;

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
    height: 150,
    gap: 25,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: colors.VIVID_GAMBOGE,
    padding: 10,
    borderRadius: 30,
    width: 100,
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 30,
    width: 100,
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
    color: colors.MIDNIGHT,
    textAlign: 'center',
    fontSize: 18,
  },
  orderText: {
    color: colors.PLATINUM_GRAY,
    textAlign: 'center',
    fontSize: 16,
  },
});
