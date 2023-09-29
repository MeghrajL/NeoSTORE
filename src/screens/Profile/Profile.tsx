import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import MenuItem from '../../components/profileComponents/menuItem/MenuItem';
import {ProfileScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getUserAccountDetails} from '../../redux/slices/authSlice/authSlice';
const Profile = ({navigation}: ProfileScreenNavigationProp) => {
  const dispatch = useAppDispatch();

  // const access_token = useAppSelector(
  //   state => state.auth.user?.data?.access_token,
  // );
  // useEffect(() => {
  //   try {
  //     dispatch(getUserAccountDetails(access_token));
  //     console.log('😎dis');
  //   } catch (error) {
  //     console.log('some error');
  //   }
  // }, [dispatch, access_token]);

  const userData = useAppSelector(
    state => state.auth.userAccountDetails?.data?.user_data,
  );

  function onChangePasswordHandler() {
    navigation.navigate('ChangePassword');
  }

  function onUpdateDetailsHandler() {
    navigation.navigate('UpdateDetails');
  }

  function onMyOrdersHandler() {
    navigation.navigate('OrderList');
  }

  function onAddressHandler() {
    navigation.navigate('Address');
  }
  // let imageSource;
  // if (userData?.profile_pic || userData?.profile_pic !== '') {
  //   imageSource = {uri: userData?.profile_pic};
  // } else {
  //   if (userData?.gender === 'M') {
  //     imageSource = require('../../assets/images/man.png');
  //   } else if (userData?.gender === 'F') {
  //     imageSource = require('../../assets/images/woman.png');
  //   }
  // }

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
          icon={'refresh'}
          title="Change Password"
          onPress={onChangePasswordHandler}
        />
        <MenuItem
          icon={'bag-handle-outline'}
          title="My Orders"
          onPress={onMyOrdersHandler}
        />
        <MenuItem
          icon={'create-outline'}
          title="Update Details"
          onPress={onUpdateDetailsHandler}
        />
        {/* 
        <MenuItem
          icon={'location-outline'}
          title="Payment"
          onPress={onAddressHandler}
        /> */}
        <MenuItem
          icon={'log-out-outline'}
          title="Logout"
          onPress={() => {}}
          isLast={true}
        />
      </View>
    </View>
  );
};

export default Profile;
