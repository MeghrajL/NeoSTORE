import {
  Button,
  FlatList,
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
import ImageCarousel from '../../components/productDetailComponents/ImageCarousel/ImageCarousel';
import Title from '../../components/generic/Title/Title';
import ProductItemHorizontal from '../../components/categoryComponents/productItemHorizontal/productItemHorizontal';
import ProductItem from '../../components/categoryComponents/productItem/ProductItem';
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
  const authData = useAppSelector(state => state.auth);
  console.log('from home', authData);
  const product_images = userData?.product_categories.map(category => {
    return {
      image: category.icon_image,
    };
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <Button
          title="nev"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        />
        {product_images && (
          <View style={styles.carouselContainer}>
            <ImageCarousel
              product_images={product_images}
              resizeMode="stretch"
            />
          </View>
        )}

        <CategoryTypes product_categories={userData?.product_categories} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  carouselContainer: {
    height: 160,
    width: '95%',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 30,
    marginTop: 20,
  },
});
