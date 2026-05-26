import React from 'react';
import {
  Text,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props = {
  onPress: () => void;
  text: string;
  style: StyleProp<ViewStyle>;
};

export const CustomButton = ({ onPress, text, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={{ color: '#fff', textAlign: 'center' }}>{text}</Text>
    </TouchableOpacity>
  );
};
