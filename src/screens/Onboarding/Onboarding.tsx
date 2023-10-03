import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {OnboardingScreenNavigationProp} from '../../navigation/type';

import {styles} from './style';

const NextArrow = ({...props}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} {...props}>
      <Icon name="arrow-forward-outline" size={40} color="white" />
    </TouchableOpacity>
  );
};

const Done = ({...props}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} {...props}>
      <Icon name="checkmark-outline" size={40} color="white" />
    </TouchableOpacity>
  );
};

/**
 * @author Meghraj Vilas Lot
 * @param {ForgotPasswordScreenNavigationProp}
 * @description has 3 slides for onboarding
 * @returns jsx for onboarding screen
 */

const OnboardingContainer = ({navigation}: OnboardingScreenNavigationProp) => {
  return (
    <Onboarding
      onDone={() => navigation.navigate('SignIn')}
      bottomBarColor="white"
      bottomBarHighlight={false}
      transitionAnimationDuration={100}
      NextButtonComponent={NextArrow}
      DoneButtonComponent={Done}
      bottomBarHeight={100}
      showSkip={false}
      titleStyles={styles.titleStyle}
      containerStyles={styles.containerStyles}
      subTitleStyles={styles.subtitleStyle}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.imageStyle}
              source={require('../../assets/images/Moving-bro.png')}
            />
          ),
          title: 'Welcome!',
          subtitle: 'One Stop Shop For All Your Furniture Needs',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.imageStyle}
              source={require('../../assets/images/Moving-pana.png')}
            />
          ),
          title: 'Explore All Options',
          subtitle: 'Select The Perfect One For You',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.imageStyle}
              source={require('../../assets/images/Moving-amico.png')}
            />
          ),
          title: 'You Are All Set!',
          subtitle: 'Go And Get It',
        },
      ]}
    />
  );
};

export default OnboardingContainer;
