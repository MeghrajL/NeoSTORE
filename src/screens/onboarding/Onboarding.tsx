import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets/colors';
import {OnboardingScreenNavigationProp} from '../../navigation/type';

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

const OnboardingContainer = ({navigation}: OnboardingScreenNavigationProp) => {
  return (
    <Onboarding
      onDone={() => navigation.navigate('Register')}
      //   onSkip={() => navigation.navigate('Register')}
      bottomBarColor="white"
      bottomBarHighlight={false}
      transitionAnimationDuration={100}
      NextButtonComponent={NextArrow}
      DoneButtonComponent={Done}
      bottomBarHeight={100}
      showSkip={false}
      titleStyles={styles.titleStyle}
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

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    borderRadius: 200,
    padding: 20,
    marginRight: '10%',
  },
  imageStyle: {
    height: 350,
    width: 350,
    // paddingBottom: 130,
  },
  titleStyle: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 40,
    // color: colors.VIVID_GAMBOGE,
  },
  subtitleStyle: {
    fontFamily: 'Gilroy-Regular',
  },
});
