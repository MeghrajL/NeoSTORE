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
}

const GenericButton = ({
  title,
  onPress,
  fontSize,
  fontFamily,
  style,
  color,
}: IGenericButton): React.JSX.Element => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{fontSize: fontSize, fontFamily: fontFamily, color: color}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default GenericButton;

// const styles = StyleSheet.create({
//     textStyle:{

//     }
// })
