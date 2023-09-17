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
