import {View, Text, FlatList, TextInput} from 'react-native';
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
const Explore = ({navigation}: ExploreScreenNavigationProp) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
    const filtered = allCategoriesData.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    console.log('h');
    setSearchQuery('');
    setFilteredProducts(allCategoriesData);
  };

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
          <View
            style={{
              width: '100%',
              height: 50,
              alignSelf: 'center',
              marginBottom: 9,
            }}>
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
