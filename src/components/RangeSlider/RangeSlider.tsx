import React, {useCallback, useState} from 'react';
import RangeSliderRN from 'rn-range-slider';
import {View, Text} from 'react-native';

import Label from './Label';
import Notch from './Notch';
import Rail from './RailSelected';
import RailSelected from './RailSelected';
import Thumb from './Thumb';

const RangeSlider = ({from, to, setMin, setMax}) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(99999);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleChange = useCallback(
    (newLow, newHigh) => {
      console.log(newLow, newHigh);
      setLow(newLow);
      setHigh(newHigh);
      setMin(newLow);
      setMax(newHigh);
    },
    [setLow, setHigh, setMax, setMin],
  );

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View>
          <Text
            style={[
              {fontStyle: 'italic'},
              {textAlign: 'left', fontSize: 14, color: '#D2D2D2'},
            ]}>
            Min
          </Text>
          <Text
            style={[{fontWeight: 'bold'}, {fontSize: 18, color: '#000000'}]}>
            {low}€
          </Text>
        </View>
        <View>
          <Text
            style={[
              {fontStyle: 'italic'},
              {textAlign: 'right', fontSize: 14, color: '#D2D2D2'},
            ]}>
            Max
          </Text>
          <Text
            style={[{fontWeight: 'bold'}, {fontSize: 18, color: '#000000'}]}>
            {high}€
          </Text>
        </View>
      </View>
      <RangeSliderRN
        // style={styles.slider}
        min={low}
        max={high}
        step={1000}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        // renderNotch={renderNotch}
        onValueChanged={handleChange}
      />
    </>
  );
};

export default RangeSlider;
