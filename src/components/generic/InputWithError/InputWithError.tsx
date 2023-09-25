import {InputModeOptions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GenericInput from '../GenericInput/GenericInput';
import GenericText from '../GenericText/GenericText';

interface IInputWithError {
  placeholder: string;
  maxLength: number;
  inputMode: InputModeOptions | undefined;
  icon: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
  validator: Function;
  showErr: boolean;
  errorText: string;
  samePass?: boolean;
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
  samePass,
}: IInputWithError) => {
  const [err, setErr] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (placeholder === 'Confirm Password') {
      // console.log('Validator fn-______', validator());
      if (validator()) {
        setErr('');
      } else {
        setErr(errorText);
      }
    } else {
      if (validator(inputText)) {
        setErr('');
      } else {
        setErr(errorText);
      }
    }
  }, [samePass, inputText]);

  function handler(text: string) {
    onChangeText(text.trim());
    setInputText(text.trim());
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
      {(value === '' && showErr) || (showErr && err !== '') ? (
        <GenericText textType="medium" style={styles.errorStyle}>
          {errorText}
        </GenericText>
      ) : null}
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
