import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {PaymentScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {placeOrder} from '../../redux/slices/orderSlice/orderSlice';
import {getCartList} from '../../redux/slices/cartSlice/cartSlice';
import {styles} from './style';
import CheckoutProgress from '../../components/generic/CheckoutProgress/CheckoutProgress';
import GenericText from '../../components/generic/GenericText/GenericText';
import DeliveryDetails from '../../components/generic/DeliveryDetails/DeliveryDetails';
import CartSummaryItem from '../../components/generic/CartSummaryItem/CartSummaryItem';
import BottomCard from '../../components/generic/BottomCard/BottomCard';
import SlideButton from 'rn-slide-button';
import {colors} from '../../assets/colors';
import ContinueModal from '../../components/checkoutComponents/ContinueModal/ContinueModal';
import Tick from '../../components/generic/Tick/Tick';
import Load from '../../components/generic/Load/Load';

const Payment = ({navigation, route}: PaymentScreenNavigationProp) => {
  const {id} = route.params;
  const Address = useAppSelector(state =>
    state.auth.addressData.addressList.find(
      (address: {id: string}) => address.id === id,
    ),
  );
  const userData = useAppSelector(state => state.auth.user?.data);
  const cart = useAppSelector(state => state.cart.cart);
  const isLoading = useAppSelector(state => state.order.isLoading);
  // const isLoading = false;
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOrderPlaced, setOrderPlaced] = useState(false);
  const [checkoutProgress, setCheckoutProgress] = useState(2);

  const OnPlaceOrder = async () => {
    try {
      await dispatch(
        placeOrder({
          access_token: userData?.access_token,
          address: Address?.address,
        }),
      ).unwrap();
      setOrderPlaced(true);
      setCheckoutProgress(3);
      dispatch(getCartList({access_token: userData?.access_token}));
      setTimeout(() => {
        openModal();
      }, 2000);
      // Vibration.vibrate(1000);
      //sound
    } catch (error) {
      console.error(error);
    }
  };

  function navigateToProductDetail(product_id: number) {
    navigation.navigate('ProductDetail', {
      product_id: product_id,
      shouldLoadSimilarProducts: true,
    });
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.popToTop();
    navigation.navigate('Home');
  };

  const formattedAddress = `${Address?.address.firstLine}, ${Address?.address.secondLine}, ${Address?.address.city}, ${Address?.address.state}, ${Address?.address.pincode}, ${Address?.address.country}`;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <CheckoutProgress id={checkoutProgress} />
          <DeliveryDetails userData={userData} address={formattedAddress} />

          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.content}
            ListHeaderComponent={
              <View style={styles.header}>
                <GenericText style={styles.titleText} textType="medium">
                  Cart Summary
                </GenericText>
                <GenericText style={styles.quanText}>
                  Total Items : {cart?.count}
                </GenericText>
              </View>
            }
            data={cart?.data}
            renderItem={({item}) => (
              <CartSummaryItem
                product_id={item.product.id}
                sub_total={item.product.sub_total}
                quantity={item.quantity}
                name={item.product.name}
                product_images={item.product.product_images}
                rate={false}
                onPress={navigateToProductDetail}
              />
            )}
          />
        </View>
      </ScrollView>
      <View>
        <BottomCard>
          <View
            style={{
              gap: 10,
            }}>
            <View style={styles.textView}>
              <GenericText style={styles.costText}>Cart Total</GenericText>
              <GenericText style={styles.costText}>₹{cart?.total}</GenericText>
            </View>
            <View style={styles.textView}>
              <GenericText style={styles.deliveryText}>Delivery</GenericText>
              <GenericText style={styles.freeText}>Free</GenericText>
            </View>
          </View>
          <View style={{height: 50}}>
            {isLoading ? (
              <Load />
            ) : !isOrderPlaced ? (
              <SlideButton
                height={50}
                title="Slide To Place Order"
                titleStyle={{fontFamily: 'Gilroy-Regular'}}
                containerStyle={styles.slideCon}
                underlayStyle={{backgroundColor: colors.VIVID_GAMBOGE}}
                onReachedToEnd={OnPlaceOrder}
              />
            ) : (
              <Tick />
            )}
          </View>
        </BottomCard>

        <ContinueModal isVisible={isModalVisible} onClose={closeModal} />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
