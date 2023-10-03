import React, {useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {HomeScreenNavigationProp} from '../../navigation/type';
import {useAppSelector, useAppDispatch} from '../../redux/store';
import {getUserAccountDetails} from '../../redux/slices/authSlice/actions';

import CategoryTypes from '../../components/homeComponents/categoryTypes/CategoryTypes';
import ImageCarousel from '../../components/productDetailComponents/imageCarousel/ImageCarousel';
import {styles} from './style';

/**
 * @author Meghraj Vilas Lot
 * @param {HomeScreenNavigationProp}
 * @description displays image carousel and category types
 * @returns jsx for home screen
 */

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
    } catch (error) {
      console.log('some error');
    }
  }, [dispatch, access_token]);

  const userData = useAppSelector(state => state.auth.userAccountDetails?.data);

  const product_images = userData?.product_categories.map(category => {
    return {
      image: category.icon_image,
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {product_images && (
          <View style={styles.carouselContainer}>
            <ImageCarousel
              product_images={product_images}
              resizeMode="stretch"
              loop={true}
              autoplay={true}
            />
          </View>
        )}

        <CategoryTypes product_categories={userData?.product_categories} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
