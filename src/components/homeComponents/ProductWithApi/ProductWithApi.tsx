import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {baseUrl, getDetail} from '../../../constants/url';

const ProductWithApi = ({product_id}) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const url = `${baseUrl}/${getDetail}?product_id=${product_id}`;

    axios
      .get(url)
      .then(response => {
        console.log('%', response.data);
        setProduct(response.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <View>
          <Text>Name:{product?.name}</Text>
        </View>
      )}
    </View>
  );
};

export default ProductWithApi;

const styles = StyleSheet.create({});
