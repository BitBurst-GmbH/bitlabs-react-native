import React from 'react';
import { View, type StyleProp, Text, type TextStyle } from 'react-native';

type Props = {
  styles?: StyleProp<TextStyle>;
  currency?: JSX.Element;
  value: string;
};

export const RewardView = ({ currency, styles, value }: Props) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={styles}>{value}</Text>
    {currency}
  </View>
);
