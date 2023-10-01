import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IAddress, IUserData} from '../../../redux/slices/authSlice/type';
import {colors} from '../../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import GenericText from '../../generic/GenericText/GenericText';

interface IOrderDetailCard {
  order_id: number;
  created: string;
  cartTotal: number;
}

const OrderDetailCard = ({order_id, created, cartTotal}: IOrderDetailCard) => {
  return (
    <View style={{marginVertical: 20}}>
      <GenericText style={styles.titleText} textType="medium">
        Order Summary
      </GenericText>
      <View style={styles.container}>
        <Icon
          name="bag-handle-outline"
          color={colors.VIVID_GAMBOGE}
          size={33}
        />

        <View style={styles.addressView}>
          <GenericText style={styles.nameText}>
            Order Id : {order_id}
          </GenericText>
          <GenericText style={styles.nameText}>
            Order Date : {created}
          </GenericText>
          <GenericText style={styles.nameText}>
            Order Total : ₹{cartTotal}
          </GenericText>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailCard;

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
  nameText: {color: colors.RICH_BLACK, fontSize: 18},
  titleText: {
    color: colors.RICH_BLACK,
    fontSize: 22,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
