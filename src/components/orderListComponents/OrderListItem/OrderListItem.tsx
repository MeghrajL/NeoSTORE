import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GenericText from '../../generic/GenericText/GenericText';
import {colors} from '../../../assets/colors';

const OrderListItem = ({item, navigateToOrderDetail}) => {
  return (
    <View style={styles.container}>
      <GenericText textType="medium" style={styles.idText}>
        Order #{item.id}
      </GenericText>
      <View style={styles.rowView}>
        <GenericText style={styles.costText}>Date : {item.created}</GenericText>
        <GenericText style={styles.costText}>
          Cart Total : ₹{item.cost}
        </GenericText>
      </View>

      <View style={styles.rowView2}>
        <GenericText style={styles.delivery}>Delivered</GenericText>

        <View style={styles.detailsView}>
          <TouchableOpacity
            onPress={() => navigateToOrderDetail(item.id, item.created)}
            style={styles.detailsButtonStyle}>
            <GenericText textType="medium" style={styles.detailsText}>
              Details
            </GenericText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '95%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    // alignItems: 'center',
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
    // overflow: 'hidden',
  },
  idText: {
    fontSize: 25,
    color: colors.MIDNIGHT,
  },
  costText: {
    fontSize: 18,
    color: colors.RICH_BLACK,
  },
  detailsView: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  detailsButtonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: '100%',
    width: '70%',
  },
  detailsText: {
    color: 'white',
    fontSize: 20,
  },
  rowView: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // backgroundColor: 'red',
  },
  rowView2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  delivery: {
    color: colors.PLATINUM_GRAY,
    fontSize: 18,
  },
});
