import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GenericText from '../genericText/GenericText';
import {IAddress, IUserData} from '../../../redux/slices/authSlice/type';
import {colors} from '../../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface IDeliveryDetails {
  address: string;
  userData: IUserData;
}

const DeliveryDetails = ({address, userData}: IDeliveryDetails) => {
  return (
    <>
      <GenericText style={styles.titleText} textType="medium">
        Delivery Details
      </GenericText>
      <View style={styles.container}>
        <Icon
          name="person-circle-outline"
          color={colors.VIVID_GAMBOGE}
          size={35}
        />

        <View style={styles.addressView}>
          <GenericText style={styles.nameText} textType="medium">
            {userData?.first_name} {userData?.last_name}
          </GenericText>
          <View>
            <GenericText style={styles.addressText}>
              {address}
              {/* {address.firstLine}, {address.secondLine}, {address.city},{' '}
              {address.state}, {address.country}, {address.pincode} */}
            </GenericText>
          </View>
          <GenericText style={styles.addressText} textType="medium">
            {userData?.phone_no}
          </GenericText>
        </View>
      </View>
    </>
  );
};

export default DeliveryDetails;

const styles = StyleSheet.create({
  container: {
    // height: 100,
    width: '95%',
    backgroundColor: 'white',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '2.5%',
    gap: 8,
    padding: 20,

    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {height: 10, width: 0},
    elevation: 10,

    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  addressView: {gap: 8},
  addressText: {color: colors.RICH_BLACK, fontSize: 16},
  nameText: {color: colors.RICH_BLACK, fontSize: 20},
  titleText: {
    color: colors.RICH_BLACK,
    fontSize: 22,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
