import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {CategoryScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import {styles} from './style';
import GenericText from '../../components/generic/genericText/GenericText';
import Loading from '../../components/generic/loading/Loading';
import ProductItemHorizontal from '../../components/categoryComponents/productItemHorizontal/productItemHorizontal';

import ErrorScreen from '../../components/generic/errorScreen/ErrorScreen';
import {getCategoryList} from '../../redux/slices/productSlice/actions';
const Category = ({navigation, route}: CategoryScreenNavigationProp) => {
  const {isError, isLoading, category} = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  // console.log('from category>>>>>>>>', isLoading);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const {product_category_id, categoryName} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({title: categoryName});
  }, [categoryName, navigation]);

  useEffect(() => {
    if (category !== null) {
      setInitialDataLoaded(true);
    }
  }, [category]);

  useEffect(() => {
    // if (category?.data[0].product_category_id !== product_category_id) {
    dispatch(getCategoryList({product_category_id: product_category_id}))
      .then(() => {
        setDataLoaded(true);
        setInitialDataLoaded(true);
      })
      .catch(error => {
        console.error(error);
      });
    // }
  }, [dispatch, product_category_id]);

  function seeMore(page: number) {
    setPage(page);
    dispatch(
      getCategoryList({product_category_id: product_category_id, page: page}),
    )
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function navigateToProductDetail(product_id: number) {
    navigation.navigate('ProductDetail', {
      product_id: product_id,
      shouldLoadSimilarProducts: false,
    });
  }

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        {product_category_id === 1 && page === 1 && (
          <TouchableOpacity onPress={() => seeMore(2)}>
            <GenericText style={styles.footerStyle}>See more</GenericText>
          </TouchableOpacity>
        )}
        {product_category_id === 1 && page === 2 && (
          <TouchableOpacity onPress={() => seeMore(1)}>
            <GenericText style={styles.footerStyle}>Back</GenericText>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {
        // category?.data[0].product_category_id !== product_category_id ||
        isLoading || !dataLoaded || !initialDataLoaded ? (
          <Loading />
        ) : isError ? (
          <ErrorScreen />
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={category?.data}
              renderItem={({item}) => (
                <ProductItemHorizontal
                  item={item}
                  onPress={navigateToProductDetail}
                />
              )}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.contentStyle}
              ListFooterComponent={<Footer />}
            />
          </View>
        )
      }
    </SafeAreaView>
  );
};

export default Category;
