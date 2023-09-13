import {InputModeOptions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import GenericInput from '../GenericInput/GenericInput';
import GenericText from '../GenericText/GenericText';

interface IInputWithError {
  placeholder: string;
  maxLength: number;
  inputMode: InputModeOptions | undefined;
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  validator: Function;
  showErr: boolean;
  errorText: string;
}

const InputWithError = ({
  placeholder,
  maxLength,
  inputMode,
  icon,
  onChangeText,
  value,
  validator,
  showErr,
  errorText,
}: IInputWithError) => {
  const [err, setErr] = useState('');

  function handler(text: string) {
    onChangeText(text);

    if (placeholder === 'Confirm Password') {
      console.log(validator());
      if (validator()) {
        setErr(errorText);
      } else {
        setErr('');
      }
    }
    if (validator(text)) {
      setErr('');
    } else {
      setErr(errorText);
    }

    console.log('>', text);
  }

  return (
    <View style={styles.elementView}>
      <GenericInput
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        onChangeText={handler}
        icon={icon}
        value={value}
      />
      {showErr && err !== '' && (
        <GenericText textType="medium" style={styles.errorStyle}>
          {errorText}
        </GenericText>
      )}
    </View>
  );
};

export default InputWithError;

const styles = StyleSheet.create({
  elementView: {
    paddingHorizontal: 10,
  },
  errorStyle: {
    color: 'red',
    paddingHorizontal: 5,
    // marginHorizontal: 10,
  },
});
