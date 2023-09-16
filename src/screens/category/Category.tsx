import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getCategoryList} from '../../redux/slices/productSlice';
import ProductItem from '../../components/categoryComponents/productItem/ProductItem';
import {styles} from './style';
const Category = ({navigation, route}) => {
  const isLoading = useAppSelector(state => state.product.isLoading);
  console.log('from category>>>>>>>>', isLoading);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const {product_category_id} = route.params;

  const dispatch = useAppDispatch();

  function seeMore(page) {
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

  useEffect(() => {
    dispatch(getCategoryList({product_category_id: product_category_id}))
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch, product_category_id, setDataLoaded]);
  const category = useAppSelector(state => state.product.category);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading || !dataLoaded ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          <View style={styles.container}>
            <FlatList
              data={category?.data}
              renderItem={({item}) => <ProductItem item={item} />}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.contentStyle}
              columnWrapperStyle={styles.wrapperStyle}
            />
            {product_category_id === 1 && page === 1 && (
              <TouchableOpacity onPress={() => seeMore(2)}>
                <Text>See more</Text>
              </TouchableOpacity>
            )}
            {product_category_id === 1 && page === 2 && (
              <TouchableOpacity onPress={() => seeMore(1)}>
                <Text>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Category;
