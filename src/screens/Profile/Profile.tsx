import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import MenuItem from '../../components/profileComponents/menuItem/MenuItem';
import {ProfileScreenNavigationProp} from '../../navigation/type';
import {useAppSelector} from '../../redux/store';
const Profile = ({navigation}: ProfileScreenNavigationProp) => {
  const userData = useAppSelector(
    state => state.auth.userAccountDetails?.data?.user_data,
  );
  // console.log(userData);
  function onChangePasswordHandler() {
    navigation.navigate('ChangePassword');
  }

  function onUpdateDetailsHandler() {
    navigation.navigate('UpdateDetails');
  }

  let imageSource;
  if (userData?.profile_pic && userData?.profile_pic !== '') {
    imageSource = {uri: userData?.profile_pic};
  } else {
    if (userData?.gender === 'M') {
      imageSource = require('../../assets/images/man.png');
    } else {
      imageSource = require('../../assets/images/woman.png');
    }
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
          icon={'refresh'}
          title="Change Password"
          onPress={onChangePasswordHandler}
        />
        <MenuItem
          icon={'refresh'}
          title="Change Password"
          onPress={onChangePasswordHandler}
        />
        <MenuItem
          icon={'create'}
          title="Update Details"
          onPress={onUpdateDetailsHandler}
          isLast={true}
        />
      </View>
    </View>
  );
};

export default Profile;
