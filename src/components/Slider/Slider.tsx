import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {RangeSlider} from '@sharcoux/slider';
import {min} from 'lodash';

const Slider = ({setPrice}) => {
  const [priceFilter, setPriceFilter] = useState({
    minPrice: 0,
    maxPrice: 99999,
  });

  const onSlideEnd = value => {
    const min = value[0];
    const max = value[1];
    console.log('<><><', min, max);
  };

  return (
    <View>
      <RangeSlider
        range={[0, 99999]}
        onSlidingStart={value => console.log('start:', value)}
        onSlidingComplete={value => onSlideEnd(value)}
        // onValueChange={value => onValueChange(value)}
        style={{width: '90%', alignSelf: 'center'}}
        minimumValue={0}
        maximumValue={99999}
        step={1000}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
