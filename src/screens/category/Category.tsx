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
import {getCategoryList} from '../../redux/slices/productSlice/productSlice';
import ProductItem from '../../components/categoryComponents/productItem/ProductItem';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import Loading from '../../components/generic/Loading/Loading';
import ProductItemHorizontal from '../../components/categoryComponents/productItemHorizontal/productItemHorizontal';
const Category = ({navigation, route}: CategoryScreenNavigationProp) => {
  const isLoading = useAppSelector(state => state.product.isLoading);
  const dispatch = useAppDispatch();
  const category = useAppSelector(state => state.product.category);

  // console.log('from category>>>>>>>>', isLoading);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const {product_category_id, categoryName} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({title: categoryName});
  }, [categoryName, navigation]);

  useEffect(() => {
    dispatch(getCategoryList({product_category_id: product_category_id}))
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch, product_category_id, setDataLoaded]);

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
    navigation.navigate('ProductDetail', {product_id: product_id});
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
      {isLoading || !dataLoaded ? (
        <Loading />
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
      )}
    </SafeAreaView>
  );
};

export default Category;
