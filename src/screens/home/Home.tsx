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
const Home = ({navigation}: HomeScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  // const userData = useAppSelector(
  //   state => state.auth.userAccountDetails?.data?.user_data,
  // );
  // console.log('from home', userData);
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );
  useEffect(() => {
    dispatch(getUserAccountDetails(access_token));
  }, [dispatch, access_token]);

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
