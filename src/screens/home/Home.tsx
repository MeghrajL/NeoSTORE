import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {HomeScreenNavigationProp} from '../../navigation/type';
import {useAppSelector, useAppDispatch} from '../../redux/store';
import {getProduct} from '../../redux/slices/productSlice';
import Product from '../../components/homeComponents/ProductWithApi/ProductWithApi';
const Home = ({navigation}: HomeScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  // const product = useAppSelector(state => state.product.productData);
  // console.log('from home', product);

  // useEffect(() => {
  //   dispatch(getProduct({product_id: '1'}));
  // }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{fontSize: 50, color: 'black', fontFamily: 'Gilroy-Light'}}>
          Home
        </Text>
        <Text
          onPress={() => dispatch(getProduct({product_id: '1'}))}
          style={{fontSize: 50, color: 'black', fontFamily: 'Gilroy-Light'}}>
          product
        </Text>
        {/* <Product product_id={10} />
        <Product product_id={11} />
        <Product product_id={12} />
        <Product product_id={13} /> */}
        <Button
          title="Table"
          onPress={() =>
            navigation.navigate('Category', {
              product_category_id: 1,
              categoryName: 'Tables',
            })
          }
        />
        <Button
          title="chair"
          onPress={() =>
            navigation.navigate('Category', {
              product_category_id: 2,
              categoryName: 'Chairs',
            })
          }
        />
        <Button
          title="sofa"
          onPress={() =>
            navigation.navigate('Category', {
              product_category_id: 3,
              categoryName: 'Sofas',
            })
          }
        />
        <Button
          title="bed"
          onPress={() =>
            navigation.navigate('Category', {
              product_category_id: 4,
              categoryName: 'Beds',
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
