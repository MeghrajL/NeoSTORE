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
  value: string;
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
        contentStyle={{fontFamily: 'Gilroy-Regular'}}
        outlineStyle={{
          borderWidth: 0,
          backgroundColor: 'transparent',
          borderBottomWidth: 0.3,
        }}
        left={
          <TextInput.Icon
            icon={icon}
            color={focus ? colors.VIVID_GAMBOGE : '#ccc'}
          />
        }
        right={
          placeholder === 'Password' || placeholder === 'Confirm Password' ? (
            <TextInput.Icon icon="eye" />
          ) : null
        }
        style={styles.inputStyle}
        maxLength={maxLength}
        activeOutlineColor={colors.VIVID_GAMBOGE}
        inputMode={inputMode}
        secureTextEntry={
          placeholder === 'Password' || placeholder === 'Confirm Password'
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
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Gilroy-Bold',
  },
  inputStyle: {
    fontSize: 22,
    width: '100%',
    color: 'black',
    // borderWidth: 0.1,
  },
});
