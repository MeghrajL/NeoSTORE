import {InputModeOptions, StyleSheet, View, Text} from 'react-native';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../assets/colors';

interface IGenericInput {
  placeholder: string;
  maxLength: number;
  inputMode: InputModeOptions | undefined;
  onChangeText: (text: string) => void;
  icon: string;
  value: string | undefined;
}

export default function GenericInput({
  placeholder,
  maxLength,
  inputMode,
  onChangeText,
  icon,
  value,
}: IGenericInput) {
  const [focus, setFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View
      style={[
        styles.container,
        // {borderColor: focus ? colors.VIVID_GAMBOGE : colors.RICH_BLACK},
      ]}>
      <TextInput
        mode="outlined"
        label={
          <>
            <Text style={{fontFamily: 'Gilroy-Regular'}}>{placeholder}</Text>
          </>
        }
        contentStyle={styles.content}
        outlineStyle={styles.outline}
        left={
          <TextInput.Icon
            icon={icon}
            color={focus ? colors.VIVID_GAMBOGE : colors.MIDNIGHT}
          />
        }
        right={
          placeholder === 'Password' ||
          placeholder === 'Confirm Password' ||
          placeholder === 'Old Password' ? (
            <TextInput.Icon
              onPress={() => setIsVisible(!isVisible)}
              icon={isVisible ? 'eye' : 'eye-off'}
              color={colors.MIDNIGHT}
            />
          ) : null
        }
        style={styles.inputStyle}
        maxLength={maxLength}
        activeOutlineColor={colors.VIVID_GAMBOGE}
        inputMode={inputMode}
        secureTextEntry={
          !isVisible &&
          (placeholder === 'Password' ||
            placeholder === 'Confirm Password' ||
            placeholder === 'Old Password')
            ? true
            : false
        }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={onChangeText && onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 1,
    width: '100%',
    height: 60,
    // paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Gilroy-Bold',
  },
  inputStyle: {
    fontSize: 16,
    width: '100%',
    color: 'black',
    // borderWidth: 0.1,
  },
  outline: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 0.3,
  },
  content: {
    fontFamily: 'Gilroy-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },
});
