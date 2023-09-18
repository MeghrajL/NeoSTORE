import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';

interface IGenericButton {
  title: String;
  onPress: (event: GestureResponderEvent) => void;
  fontSize: Number;
  fontFamily: String;
  style: ViewStyle;
  color: String;
  disabled?: boolean;
}

const GenericButton = ({
  title,
  onPress,
  fontSize,
  fontFamily,
  style,
  color,
  disabled,
}: IGenericButton): React.JSX.Element => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[style, {opacity: disabled ? 0.2 : 1}]}
      onPress={onPress}>
      <Text style={{fontSize: fontSize, fontFamily: fontFamily, color: color}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default GenericButton;
