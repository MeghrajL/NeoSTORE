import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreenNavigationProp} from '../../navigation/type';
import {useAppSelector, useAppDispatch} from '../../redux/store';
import {getCategoryList, getProduct} from '../../redux/slices/productSlice';
const Home = ({navigation}: HomeScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.product.productData);
  console.log('from home', product);

  useEffect(() => {
    dispatch(getProduct({product_id: '1'}));
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        <Text
          onPress={() => dispatch(getCategoryList({product_category_id: '1'}))}
          style={{fontSize: 50, color: 'black', fontFamily: 'Gilroy-Light'}}>
          Home
        </Text>
        <Text
          onPress={() => dispatch(getProduct({product_id: '1'}))}
          style={{fontSize: 50, color: 'black', fontFamily: 'Gilroy-Light'}}>
          product
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
