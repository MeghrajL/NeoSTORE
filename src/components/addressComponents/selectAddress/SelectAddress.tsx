import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/genericText/GenericText';
import IconButton from '../../generic/iconButton/IconButton';
import {IAddressObj} from '../../../redux/slices/authSlice/type';

interface ISelectAddress {
  item: IAddressObj;
  lastSelectedAddressId: string;
  onSelectPress: Function;
  onDeletePress: Function;
  onEditPress: Function;
}

const SelectAddress = ({
  item,
  lastSelectedAddressId,
  onSelectPress,
  onDeletePress,
  onEditPress,
}: ISelectAddress) => {
  const {id, address} = item;
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        borderColor: colors.MIDNIGHT,
        color: colors.VIVID_GAMBOGE,
        borderSize: 1.5,
        id: id,
      },
    ],
    [],
  );
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: lastSelectedAddressId === id ? 'white' : '#f5f5f5'},
      ]}>
      <TouchableOpacity
        style={styles.touchView}
        onPress={() => onSelectPress(id)}>
        <View style={styles.selectView}>
          <RadioGroup
            containerStyle={styles.content}
            radioButtons={radioButtons}
            selectedId={lastSelectedAddressId === id ? id : ''}
            onPress={id => onSelectPress(id)}
          />

          <View
            style={{
              rowGap: 4,
              justifyContent: 'center',
            }}>
            <GenericText textType="medium" style={styles.typeText}>
              {address.type}
            </GenericText>
            <GenericText style={styles.addressText}>
              {address.firstLine},
            </GenericText>
            <GenericText style={styles.addressText}>
              {address.secondLine},
            </GenericText>
            <GenericText style={styles.addressText}>
              {address.city},
            </GenericText>
            <GenericText style={styles.addressText}>
              {address.state},
            </GenericText>
            <GenericText style={styles.addressText}>
              {address.country}.
            </GenericText>
            <GenericText style={styles.addressText}>
              {address.pincode}
            </GenericText>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <IconButton
          size={30}
          icon="create-outline"
          color={colors.MIDNIGHT}
          onPressCustom={() => onEditPress(id)}
        />
        <IconButton
          size={30}
          icon="trash-bin-outline"
          color={colors.MIDNIGHT}
          onPressCustom={() => onDeletePress(id)}
        />
      </View>
    </View>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '95%',
    // backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '2.5%',
    gap: 8,

    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {height: 10, width: 0},
    elevation: 10,

    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#ccc',
    // overflow: 'hidden',
  },
  touchView: {width: '75%'},
  selectView: {
    // backgroundColor: 'red',
    // marginVertical: 20,
    flexDirection: 'row',
    width: '100%',
  },

  iconContainer: {
    flexDirection: 'row',
    width: '25%',
    height: '100%',
    gap: 10,
    // backgroundColor: 'red',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginRight: 5,
  },
  typeText: {
    fontSize: 20,
    color: colors.RICH_BLACK,
  },
  addressText: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  content: {
    width: '20%',
    //   backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
