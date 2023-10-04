import {View, Text, FlatList, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getAllCategoriesData} from '../../redux/slices/productSlice/actions';
import ProductItem from '../../components/CategoryComponents/ProductItem/ProductItem';
import {ExploreScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import Loading from '../../components/Generic/Loading/Loading';
import ErrorScreen from '../../components/Generic/ErrorScreen/ErrorScreen';
import {IProduct} from '../../redux/slices/productSlice/type';
import GenericInput from '../../components/Generic/GenericInput/GenericInput';
import RangeSlider from '../../components/RangeSlider/RangeSlider';

/**
 * @author Meghraj Vilas Lot
 * @param {ExploreScreenNavigationProp}
 * @description displays all products and search feature
 * @returns jsx for explore screen
 */

const Explore = ({navigation}: ExploreScreenNavigationProp) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState({
    minPrice: '',
    maxPrice: '99999',
  });

  const [ratingFilter, setRatingFilter] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(getAllCategoriesData());
    } catch (error) {}
  }, [dispatch]);

  const {allCategoriesData, isLoading, isError} = useAppSelector(
    state => state.product,
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = allCategoriesData.filter(
      product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.producer.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    console.log('h');
    setSearchQuery('');
    setFilteredProducts(allCategoriesData);
  };

  // const handlePriceFilter = () => {
  //   console.log(priceFilter.minPrice, priceFilter.maxPrice);
  //   // setPriceFilter({, maxPrice});
  //   const filtered = allCategoriesData.filter(
  //     product =>
  //       product.cost >= Number(priceFilter.minPrice) &&
  //       product.cost <= Number(priceFilter.maxPrice),
  //   );
  //   setFilteredProducts(filtered);
  //   console.log(filtered);
  // };

  // const handleRatingFilter = minRating => {
  //   console.log(minRating);
  //   const filtered = allCategoriesData.filter(
  //     product => product.rating >= minRating,
  //   );
  //   setFilteredProducts(filtered);
  //   console.log(filtered);
  // };

  // const applyOtherFilters = products => {
  //   // Apply name filter
  //   const nameFiltered = products.filter(product =>
  //     product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );

  //   // Apply producer filter
  //   const producerFiltered = nameFiltered.filter(product =>
  //     product.producer.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );

  //   // Apply price filter
  //   const priceFiltered = producerFiltered.filter(
  //     product =>
  //       product.price >= priceFilter.minPrice &&
  //       product.price <= priceFilter.maxPrice,
  //   );

  //   // Apply rating filter
  //   const ratingFiltered = priceFiltered.filter(
  //     product => product.rating >= Number(ratingFilter),
  //   );

  //   setFilteredProducts(ratingFiltered);
  // };

  const onProductPress = (id: number) => {
    navigation.navigate('ProductDetail', {
      product_id: id,
      shouldLoadSimilarProducts: true,
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorScreen />
      ) : (
        <>
          <View style={styles.search}>
            <GenericInput
              placeholder="Search"
              inputMode="text"
              onChangeText={handleSearch}
              icon={'text-search'}
              value={searchQuery}
              isSearch={true}
              onCancelPress={clearSearch}
            />
          </View>

          <FlatList
            data={searchQuery === '' ? allCategoriesData : filteredProducts}
            renderItem={({item}) => (
              <ProductItem
                item={item}
                onPress={() => onProductPress(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.wrapperStyle}
            contentContainerStyle={styles.content}
          />
        </>
      )}
    </View>
  );
};

export default Explore;
