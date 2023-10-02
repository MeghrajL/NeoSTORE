import {View, Text, Image, Alert} from 'react-native';
import React from 'react';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import MenuItem from '../../components/profileComponents/menuItem/MenuItem';
import {ProfileScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {logoutAndClearPersistedData} from '../../redux/slices/authSlice/actions';

const Profile = ({navigation}: ProfileScreenNavigationProp) => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(
    state => state.auth.userAccountDetails?.data?.user_data,
  );

  function onChangePasswordHandler() {
    navigation.navigate('ChangePassword');
  }

  function onUpdateDetailsHandler() {
    navigation.navigate('UpdateDetails');
  }

  function onOrderListHandler() {
    navigation.navigate('OrderList');
  }

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
