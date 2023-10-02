import React from 'react';
import {View, Text, Image, Alert} from 'react-native';

import {ProfileScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {logoutAndClearPersistedData} from '../../redux/slices/authSlice/actions';

import {styles} from './style';
import GenericText from '../../components/generic/genericText/GenericText';
import MenuItem from '../../components/profileComponents/menuItem/MenuItem';

/**
 * @author Meghraj Vilas Lot
 * @param {ProfileScreenNavigationProp}
 * @description displays user profile pic, email and menu for order,change password, update details & logout
 * @returns jsx for profile screen
 */

const Profile = ({navigation}: ProfileScreenNavigationProp) => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(
    state => state.auth.userAccountDetails?.data?.user_data,
  );

  const onChangePasswordHandler = () => {
    navigation.navigate('ChangePassword');
  };

  const onUpdateDetailsHandler = () => {
    navigation.navigate('UpdateDetails');
  };

  const onOrderListHandler = () => {
    navigation.navigate('OrderList');
  };

  let imageSource;
  if (userData?.profile_pic === null || userData?.profile_pic === '') {
    if (userData?.gender === 'M') {
      imageSource = require('../../assets/images/man.png');
    } else if (userData?.gender === 'F') {
      imageSource = require('../../assets/images/woman.png');
    }
  } else {
    imageSource = {uri: userData?.profile_pic};
  }

  const handleLogout = async () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
    dispatch(logoutAndClearPersistedData());
  };

  const onLogoutPress = () => {
    Alert.alert('Do really you want to logout?', '', [
      {text: 'Yes', onPress: () => handleLogout()},
      {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.imageStyle} />
        </View>

        <View style={styles.infoContainer}>
          <GenericText
            numberOfLines={1}
            textType="medium"
            style={styles.nameFont}>
            {userData?.first_name} {userData?.last_name}
          </GenericText>
          <GenericText numberOfLines={1} style={styles.emailFont}>
            {userData?.email}
          </GenericText>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <MenuItem
          icon={'receipt-outline'}
          title="My Orders"
          onPress={onOrderListHandler}
        />
        <MenuItem
          icon={'create-outline'}
          title="Update Details"
          onPress={onUpdateDetailsHandler}
        />
        <MenuItem
          icon={'refresh'}
          title="Change Password"
          onPress={onChangePasswordHandler}
        />

        <MenuItem
          icon={'log-out-outline'}
          title="Logout"
          onPress={onLogoutPress}
          isLast={true}
        />
      </View>
    </View>
  );
};

export default Profile;
