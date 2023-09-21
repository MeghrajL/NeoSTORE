import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {HomeScreenNavigationProp} from '../../navigation/type';
import {useAppSelector, useAppDispatch} from '../../redux/store';
import {getProduct} from '../../redux/slices/productSlice/productSlice';
import Product from '../../components/homeComponents/ProductWithApi/ProductWithApi';
import CategoryTypes from '../../components/homeComponents/CategoryTypes/CategoryTypes';
const Home = ({navigation}: HomeScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  // const product = useAppSelector(state => state.product.productData);
  // console.log('from home', product);

  // useEffect(() => {
  //   dispatch(getProduct({product_id: '1'}));
  // }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* <Product product_id={10} />
        <Product product_id={11} />
        <Product product_id={12} />
        <Product product_id={13} /> */}
          <Button
            title="signin"
            onPress={() => navigation.navigate('SignIn')}
          />
          <CategoryTypes />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
