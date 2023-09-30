import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconButton from '../IconButton/IconButton';
import {colors} from '../../../assets/colors';
import {useNavigation} from '@react-navigation/native';

interface ICheckoutProgress {
  id: number;
}

const CheckoutProgress = ({id}: ICheckoutProgress) => {
  const navigation = useNavigation();
  console.log(id);
  return (
    <View style={styles.container}>
      <IconButton
        icon="location"
        color={colors.VIVID_GAMBOGE}
        size={30}
        onPressCustom={() => {
          if (id === 2) {
            navigation.navigate('Address');
          }
        }}
      />
      <View
        style={[
          styles.dash,
          {borderColor: id >= 2 ? colors.VIVID_GAMBOGE : '#ccc'},
        ]}></View>
      <IconButton
        icon="card"
        color={id >= 2 ? colors.VIVID_GAMBOGE : colors.MIDNIGHT}
        size={30}
        onPressCustom={() => {}}
      />
      <View
        style={[
          styles.dash,
          {borderColor: id >= 3 ? colors.VIVID_GAMBOGE : '#ccc'},
        ]}></View>
      <IconButton
        icon="checkmark-done-circle"
        color={id >= 3 ? colors.VIVID_GAMBOGE : colors.MIDNIGHT}
        size={30}
        onPressCustom={() => {}}
      />
    </View>
  );
};

export default CheckoutProgress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    width: '100%',
    height: 50,
    // backgroundColor: 'red',
  },
  dash: {
    borderWidth: 1,
    width: '35%',
    borderRadius: 1,
    height: 2,
    borderStyle: 'dashed',
  },
});
