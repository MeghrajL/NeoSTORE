import {
  Text,
  GestureResponderEvent,
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
interface IIconButtonProps {
  icon: string;
  color: string;
  onPressCustom: (event: GestureResponderEvent) => void;
  size: number;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IIconButtonProps}
 * @description uses ionicons icons and makes the clickable
 * @returns jsx for icon button
 */

export default function IconButton({
  icon,
  color,
  onPressCustom,
  size,
}: IIconButtonProps) {
  return (
    <TouchableOpacity onPress={onPressCustom}>
      <Icon name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}
