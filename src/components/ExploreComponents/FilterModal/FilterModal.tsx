import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useRef, useState} from 'react';
import {Rating} from 'react-native-ratings';
import {Modal, Portal} from 'react-native-paper';
import {colors} from '../../../assets/colors';
import GenericText from '../../Generic/GenericText/GenericText';
import ButtonAnimated from '../../Generic/ButtonAnimated/ButtonAnimated';
import {RangeSlider} from '@sharcoux/slider';

interface CustomModalProps {
  isVisible: boolean;
  setPrice: Function;
  setRating: Function;
  onClose: () => void;
}
/**
 * @author Meghraj Vilas Lot
 * @param {CustomModalProps}
 * @description renders modal from rn paper and allows user to set rating
 * @returns jsx for rating modal
 */

const FilterModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  setPrice,
  setRating,
}) => {
  // const [priceFilter, setPriceFilter] = useState({
  //   minPrice: '',
  //   maxPrice: '99999',
  // });

  // const [priceFilter, setPriceFilter] = useState({
  //   minPrice: 0,
  //   maxPrice: 99999,
  // });
  const ref = useRef([min, max]);
  console.log(ref);
  let min = 0;
  let max = 99999;
  const onSlideEnd = value => {
    min = value[0];
    max = value[1];
    ref.current = value;
    console.log('<><><', min, max);
  };
  const onApply = () => {
    setPrice({min, max});
  };

  return (
    <Portal>
      <Modal visible={isVisible} style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <GenericText style={styles.infoText}>Filters</GenericText>

            {/* <TextInput
              placeholder="min"
              onChangeText={text =>
                setPriceFilter({...priceFilter, minPrice: text})
              }
            />
            <TextInput
              placeholder="max"
              onChangeText={text =>
                setPriceFilter({...priceFilter, maxPrice: text})
              }
            /> */}
            {/* <TextInput
              placeholder="rating"
              onChangeText={text => setRating(text)}
            /> */}
            <RangeSlider
              range={[ref.current[0], ref.current[1]]}
              onSlidingStart={value => console.log('start:', value)}
              onSlidingComplete={value => onSlideEnd(value)}
              // onValueChange={value => onValueChange(value)}
              style={{width: '90%', alignSelf: 'center'}}
              minimumValue={0}
              maximumValue={99999}
              step={1000}
            />

            <TouchableOpacity onPress={onApply}>
              <GenericText textType="medium" style={styles.orderText}>
                Apply
              </GenericText>
            </TouchableOpacity>
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
export default FilterModal;

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
