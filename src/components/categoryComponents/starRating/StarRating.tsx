import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../assets/colors';

interface IStarRating {
  rating?: number;
  starSize?: number;
  color?: string;
}

const StarRating = ({
  rating = 0,
  starSize = 20,
  color = 'gold',
}: IStarRating) => {
  const starIcons = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starIcons.push(
        <Icon
          key={i}
          name="star"
          size={starSize}
          color={color}
          style={{marginRight: 5}}
        />,
      );
    } else {
      starIcons.push(
        <Icon
          key={i}
          name="star-outline"
          size={starSize}
          color={color}
          style={{marginRight: 5}}
        />,
      );
    }
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {starIcons}
    </View>
  );
};

export default StarRating;
