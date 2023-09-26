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
import {getUserAccountDetails} from '../../redux/slices/authSlice/authSlice';
import Loading from '../../components/generic/Loading/Loading';
const Home = ({navigation}: HomeScreenNavigationProp) => {
  const dispatch = useAppDispatch();

  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );
  const isLoading = useAppSelector(state => state.auth.isLoading);
  console.log(isLoading);
  useEffect(() => {
    try {
      dispatch(getUserAccountDetails(access_token));
      console.log('😎dis');
    } catch (error) {
      console.log('some error');
    }
  }, [dispatch, access_token]);

  const userData = useAppSelector(state => state.auth.userAccountDetails?.data);
  console.log('from home', userData);

  return (
    // <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <ScrollView contentContainerStyle={{paddingBottom: 60}}>
      {/* {isLoading ? (
          <Loading />
        ) : ( */}
      <View>
        {/* <Product product_id={10} />
        <Product product_id={11} />
        <Product product_id={12} />
        <Product product_id={13} /> */}
        <Button title="signin" onPress={() => navigation.navigate('SignIn')} />
        <CategoryTypes product_categories={userData?.product_categories} />
      </View>
      {/* )} */}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
