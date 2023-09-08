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
const NextArrow = ({...props}) => {
  return (
    <TouchableOpacity style={styles.nextArrowStyle} {...props}>
      <Icon name="arrow-forward-outline" size={40} color="white" />
    </TouchableOpacity>
  );
};

// const Done = ({...props}) => {
//     return (
//       <TouchableOpacity style={styles.nextArrowStyle} {...props}>
//         <Icon name="arrow-forward-outline" size={40} color="white" />
//       </TouchableOpacity>
//     );
//   };

const OnboardingContainer = ({navigation}) => {
  return (
    <Onboarding
      //   NextButtonComponent={Next}
      onDone={() => navigation.navigate('Register')}
      onSkip={() => navigation.navigate('Register')}
      bottomBarColor="white"
      bottomBarHighlight={false}
      transitionAnimationDuration={100}
      NextButtonComponent={NextArrow}
      bottomBarHeight={100}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image source={require('../../assets/images/launch_screen.png')} />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image source={require('../../assets/images/launch_screen.png')} />
          ),
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
};

export default OnboardingContainer;

const styles = StyleSheet.create({
  nextArrowStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    borderRadius: 200,
    padding: 20,
    marginRight: '10%',
  },
});
